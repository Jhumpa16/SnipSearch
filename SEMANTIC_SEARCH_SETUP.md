# Semantic Search Setup Guide

This guide explains how to set up semantic search functionality for SnipSearch using HuggingFace Transformers and Supabase vector similarity search.

## Overview

The semantic search implementation consists of:
1. **Frontend Search Page** (`src/app/search/page.tsx`) - Handles user queries and displays results
2. **API Route** (`src/app/api/generate-embedding/route.ts`) - Generates embeddings for search queries
3. **Supabase Database** - Stores clip data with vector embeddings and performs similarity search

## Setup Steps

### 1. Supabase Database Setup

Run the following SQL in your Supabase SQL editor:

```sql
-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the clips table with vector support
CREATE TABLE IF NOT EXISTS clips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    youtube_url TEXT UNIQUE NOT NULL,
    tags TEXT,
    mood TEXT,
    category TEXT,
    genre TEXT,
    theme TEXT,
    score DECIMAL(3,2),
    duration INTEGER,
    timestamp TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    embedding vector(384)
);

-- Create an index for vector similarity search
CREATE INDEX IF NOT EXISTS clips_embedding_idx ON clips USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Function to match clips by vector similarity
CREATE OR REPLACE FUNCTION match_clips(
    query_embedding vector(384),
    match_count int DEFAULT 25
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    youtube_url TEXT,
    tags TEXT,
    mood TEXT,
    category TEXT,
    genre TEXT,
    theme TEXT,
    score DECIMAL(3,2),
    duration INTEGER,
    timestamp TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    similarity DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.title,
        c.youtube_url,
        c.tags,
        c.mood,
        c.category,
        c.genre,
        c.theme,
        c.score,
        c.duration,
        c.timestamp,
        c.created_at,
        1 - (c.embedding <=> query_embedding) as similarity
    FROM clips c
    WHERE c.embedding IS NOT NULL
    ORDER BY c.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;
```

### 2. Environment Variables

Ensure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Production Embedding Generation

For production use, replace the mock embedding function in `src/app/api/generate-embedding/route.ts` with the actual HuggingFace model:

```typescript
import { pipeline } from '@transformers/pipeline';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Initialize the embedding model
    const embeddingModel = await pipeline(
      'feature-extraction',
      'sentence-transformers/all-MiniLM-L6-v2'
    );

    // Generate embedding
    const result = await embeddingModel(text, {
      pooling: 'mean',
      normalize: true
    });

    // Convert to array
    const embedding = Array.from(result.data);

    return NextResponse.json({ embedding });
  } catch (error) {
    console.error('Embedding generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate embedding' },
      { status: 500 }
    );
  }
}
```

Install the required dependency:
```bash
npm install @transformers/pipeline
```

### 4. Data Ingestion

Update your `ingest_clips.py` script to generate embeddings for each clip:

```python
def generate_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=256)
    with torch.no_grad():
        outputs = model(**inputs)
        embeddings = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
    return embeddings.tolist()

# In your main function, add embedding generation:
text = f"{row.get('title', '')} {row.get('tags', '')} {row.get('description', '')}"
embedding = generate_embedding(text)
data["embedding"] = embedding
```

## How It Works

1. **User Query**: User enters a search query on the search page
2. **Embedding Generation**: The query is sent to the API route which generates a 384-dimensional embedding vector
3. **Vector Search**: The embedding is sent to Supabase's `match_clips` RPC function
4. **Similarity Calculation**: Supabase uses cosine similarity to find the most similar clips
5. **Results Display**: The top 25 most similar clips are returned and displayed

## Features

- **Semantic Understanding**: Finds clips based on meaning, not just exact text matches
- **Real-time Search**: Instant results as you type
- **Filtering**: Additional filtering by mood, genre, theme, etc.
- **Loading States**: Proper loading indicators during search
- **Error Handling**: Graceful error handling for failed searches

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/search?q=your+search+query`
3. Test with various queries like:
   - "sad anime breakup"
   - "epic battle scene"
   - "romantic moment"
   - "funny dialogue"

## Performance Considerations

- The pgvector index enables fast similarity searches
- Embeddings are pre-computed during data ingestion
- The API route caches the embedding model for reuse
- Consider implementing result caching for frequently searched queries 