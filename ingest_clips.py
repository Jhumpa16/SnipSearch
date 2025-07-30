import os
import pandas as pd
import torch
from tqdm import tqdm
from dotenv import load_dotenv
from supabase import create_client, Client
from transformers import AutoTokenizer, AutoModel

# Load environment variables
load_dotenv(dotenv_path=".env.analysis", override=True)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

assert SUPABASE_URL and SUPABASE_KEY, "❌ Supabase credentials not set in .env.analysis!"

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load embedding model
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
tokenizer = AutoTokenizer.from_pretrained(EMBEDDING_MODEL)
model = AutoModel.from_pretrained(EMBEDDING_MODEL)

def generate_embedding(text: str) -> list:
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=256)
    with torch.no_grad():
        outputs = model(**inputs)
        embeddings = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
    return embeddings.tolist()

def already_uploaded(youtube_url: str) -> bool:
    response = supabase.table("clips").select("youtube_url").eq("youtube_url", youtube_url).execute()
    return bool(response.data)

def is_valid_row(row: dict) -> bool:
    return bool(row.get("title") and row.get("tags") and row.get("duration"))

def parse_tags(tags_str: str) -> list:
    if isinstance(tags_str, str):
        return [tag.strip() for tag in tags_str.split(',') if tag.strip()]
    return []

def safe_int(val):
    try:
        return int(float(val))
    except:
        return 0

def safe_float(val):
    try:
        return float(val)
    except:
        return 0.0

def normalize_string(val: str) -> str:
    return val.strip().lower() if isinstance(val, str) else ""

def main():
    df = pd.read_csv("clip_metadata.csv")
    uploaded, skipped, failed = 0, 0, 0

    for _, row in tqdm(df.iterrows(), total=len(df), desc="Uploading clips"):
        if not is_valid_row(row):
            print(f"⏩ Skipping invalid row: {row.get('youtube_url', 'unknown')}")
            skipped += 1
            continue

        youtube_url = row.get("youtube_url")
        if already_uploaded(youtube_url):
            print(f"⏩ Skipping duplicate: {youtube_url}")
            skipped += 1
            continue

        text = f"{row.get('title', '')} {row.get('tags', '')} {row.get('description', '')}"
        try:
            embedding = generate_embedding(text)
            data = row.to_dict()
            data["embedding"] = embedding

            # Normalize fields
            data["tags"] = parse_tags(data.get("tags", ""))
            data["duration"] = safe_int(data.get("duration"))
            data["score"] = safe_int(data.get("score"))
            data["timestamp"] = safe_int(data.get("timestamp"))
            data["mood"] = normalize_string(data.get("mood"))
            data["category"] = normalize_string(data.get("category"))

            resp = supabase.table("clips").insert(data).execute()
            if resp.data:
                print(f"✅ Uploaded: {youtube_url}")
                uploaded += 1
            else:
                print(f"❌ Failed to upload: {youtube_url}")
                failed += 1
        except Exception as e:
            print(f"❌ Error for {youtube_url}: {e}")
            failed += 1

    print(f"\n📊 Summary: {uploaded} uploaded, {skipped} skipped (invalid/duplicates), {failed} failed.")

if __name__ == "__main__":
    main()

