import os
import csv
import json
from datetime import datetime, timezone
from langdetect import detect
from tqdm import tqdm
from keybert import KeyBERT
from transformers import pipeline
from yt_dlp import YoutubeDL

# Load models
kw_model = KeyBERT(model="all-MiniLM-L6-v2")
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Labels
moods = ["Happy", "Sad", "Romantic", "Dark", "Thrilling", "Humorous", "Chill", "Tense", "Inspiring"]
categories = ["Bollywood", "Hollywood", "Anime", "Action", "Drama", "Comedy", "Romance", "Fantasy", "Documentary"]
themes = ["Friendship", "Betrayal", "Love", "War", "Survival", "Sacrifice", "Revenge", "Hope", "Loneliness", "Family"]

output_file = "clip_metadata.csv"
fieldnames = ["title", "youtube_url", "tags", "mood", "category", "genre", "theme", "score", "created_at", "timestamp", "duration", "language"]

# Load input links
with open("links.txt", "r", encoding="utf-8") as f:
    video_links = [line.strip() for line in f if line.strip()]

# 🟡 Read already processed URLs from CSV
processed_urls = set()
if os.path.exists(output_file):
    with open(output_file, "r", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            processed_urls.add(row["youtube_url"])

# Setup YouTubeDL
ydl_opts = {
    "quiet": True,
    "skip_download": True,
    "ignoreerrors": True,
    "no_warnings": True,
    "format": "bestaudio/best"
}

# Open CSV for appending new rows
with open(output_file, "a", newline="", encoding="utf-8") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    if os.stat(output_file).st_size == 0:
        writer.writeheader()

    with YoutubeDL(ydl_opts) as ydl:
        for url in tqdm(video_links, desc="Processing videos"):
            if url in processed_urls:
                continue  # ✅ Skip already processed link

            try:
                info = ydl.extract_info(url, download=False)
                if not info:
                    continue

                title = info.get("title", "").strip()
                description = info.get("description", "").strip()
                full_text = f"{title}. {description}"
                duration = round(info.get("duration", 0), 2)
                language = detect(full_text) if full_text else "unknown"

                # KeyBERT
                keywords = kw_model.extract_keywords(full_text, keyphrase_ngram_range=(1, 2), stop_words="english", top_n=5)
                tags = [kw[0] for kw in keywords]

                # Zero-shot
                mood = classifier(full_text, moods, multi_label=False)["labels"][0]
                category = classifier(full_text, categories, multi_label=False)["labels"][0]
                theme = classifier(full_text, themes, multi_label=True)["labels"][:2]
                genre = category

                # Scoring
                score = 1.0
                if duration > 300 or duration < 10:
                    score -= 0.3
                if len(tags) < 2:
                    score -= 0.2
                if not description or len(description.split()) < 10:
                    score -= 0.2
                score = max(0.0, round(score, 2))

                # Timestamp
                created_at = datetime.now(timezone.utc).isoformat()
                timestamp = int(datetime.now(timezone.utc).timestamp())

                writer.writerow({
                    "title": title,
                    "youtube_url": url,
                    "tags": ", ".join(tags),
                    "mood": mood,
                    "category": category,
                    "genre": genre,
                    "theme": ", ".join(theme),
                    "score": score,
                    "created_at": created_at,
                    "timestamp": timestamp,
                    "duration": duration,
                    "language": language
                })

                # Add to in-memory processed list
                processed_urls.add(url)

            except Exception as e:
                print(f"⚠️ Skipping {url} due to error: {e}")
                continue

