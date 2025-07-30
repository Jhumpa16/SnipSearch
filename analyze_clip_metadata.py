import os
import pandas as pd
from dotenv import load_dotenv
from supabase import create_client

# Load Supabase credentials from .env.analysis
load_dotenv(dotenv_path=".env.analysis")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch all rows from 'clips' table
print("📡 Fetching all clips from Supabase...")
response = supabase.table("clips").select("*").limit(20000).execute()
data = response.data

# Load into DataFrame
df = pd.DataFrame(data)
print(f"🔍 Total clips fetched: {len(df)}")
print("🧠 Columns:", list(df.columns))

# Check missing values
print("\n❌ Missing values per column:")
print(df.isnull().sum()[df.isnull().sum() > 0])

# Average tags per clip
df['tags'] = df['tags'].apply(lambda x: x if isinstance(x, list) else [])
avg_tags = df['tags'].apply(len).mean()
print(f"\n🏷️ Average number of tags per clip: {avg_tags}")

# Missing mood / category
print(f"\n😶 Missing mood: {df['mood'].isnull().sum()} clips")
print(f"🎭 Missing category: {df['category'].isnull().sum()} clips")

# Mood distribution
print("\n📊 Clips by mood:")
print(df['mood'].value_counts())

# Category distribution
print("\n📚 Clips by category:")
print(df['category'].value_counts())

# Duration analysis
if 'duration' in df.columns:
    df['duration'] = pd.to_numeric(df['duration'], errors='coerce')
    print(f"\n⏱️ Average clip duration: {round(df['duration'].mean(), 2)} minutes")

# Score analysis
if 'score' in df.columns:
    print("\n⭐ Score distribution:")
    print(df['score'].describe())

# Save to CSV for manual inspection (optional)
df.to_csv("clips_full_dump.csv", index=False)
print("\n💾 Saved all clips to clips_full_dump.csv")

