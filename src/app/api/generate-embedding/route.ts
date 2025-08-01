import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid or missing text' }, { status: 400 });
    }

    // Send request to local FastAPI embedding server
    const fastApiUrl = process.env.EMBEDDING_API_URL!;
    let response;
    try {
      response = await fetch(fastApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
    } catch (err) {
      console.error('❌ Error connecting to FastAPI server:', err);
      return NextResponse.json({ error: 'Failed to connect to embedding server' }, { status: 500 });
    }

    let result;
    try {
      result = await response.json();
    } catch (err) {
      console.error('❌ Error parsing FastAPI response:', err);
      return NextResponse.json({ error: 'Invalid response from embedding server' }, { status: 500 });
    }

    if (!response.ok) {
      console.error('❌ FastAPI error response:', result);
      return NextResponse.json({ error: result.error || 'Embedding server error' }, { status: 500 });
    }

    if (!result.embedding || !Array.isArray(result.embedding)) {
      return NextResponse.json({ error: 'Invalid embedding format from server' }, { status: 500 });
    }

    return NextResponse.json({ embedding: result.embedding });
  } catch (err) {
    console.error('❌ API Route Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
