# HuggingFace API Setup Guide

## Required Environment Variable

To use the real HuggingFace embedding model, you need to add your HuggingFace API token to your environment variables.

### Step 1: Get Your HuggingFace API Token

1. Go to [HuggingFace](https://huggingface.co/) and create an account or sign in
2. Go to your [Settings](https://huggingface.co/settings/tokens)
3. Click "New token"
4. Give it a name (e.g., "SnipSearch Embeddings")
5. Select "Read" permissions
6. Copy the generated token

### Step 2: Add to Environment Variables

Add the following to your `.env.local` file:

```env
# Existing Supabase variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Add this new variable
HF_API_KEY=hf_your_token_here
```

### Step 3: Restart Development Server

After adding the environment variable:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 4: Test the Setup

1. Navigate to `/search?q=test+query`
2. Open browser console (F12)
3. You should see logs like:
   ```
   🔧 Generating embedding for text: test query...
   ✅ Embedding generated successfully:
     - Length: 384
     - First 5 values: [0.123, -0.456, 0.789, ...]
     - Type: object
     - Is Array: true
     - All numbers: true
   ```

## Troubleshooting

### If you see "HF_API_KEY environment variable is not set":
- Make sure you added the token to `.env.local`
- Restart your development server
- Check that the variable name is exactly `HF_API_KEY`

### If you see HuggingFace API errors:
- Verify your token is correct
- Check that you have read permissions
- Ensure the model `sentence-transformers/all-MiniLM-L6-v2` is accessible

### If embeddings are not 384-dimensional:
- The API should automatically return 384-dimensional vectors
- Check the console logs for the actual length
- Contact HuggingFace support if the model is not working as expected

### If you see PowerShell execution policy errors:
- Run PowerShell as Administrator
- Execute: `Set-ExecutionPolicy RemoteSigned`
- Or use Command Prompt instead of PowerShell

## Security Notes

- Never commit your HuggingFace API token to version control
- The `.env.local` file is automatically ignored by Git
- Use read-only tokens for production applications 