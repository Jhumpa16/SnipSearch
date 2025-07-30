import os
import time
import random
from googleapiclient.discovery import build
from tqdm import tqdm
from dotenv import load_dotenv
import isodate
import langdetect
import csv

# ✅ Load from custom env file
load_dotenv(dotenv_path=".env.youtube")
API_KEY = os.getenv("YOUTUBE_API_KEY")

YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

SEARCH_KEYWORDS = [
    "movie scene", "anime clip", "iconic dialogue", "emotional scene",
    "motivational moment", "movie quotes", "anime moment", "powerful speech",
    "inspirational movie", "sad anime", "movie monologue", "anime edit",
    "movie scenepack", "emotional movie", "anime emotional", "movie climax",
    "anime best moment", "movie best scene", "anime powerful", "movie edit"
]

GENRE_KEYWORDS = [
    "drama", "comedy", "thriller", "sci-fi", "romance", "action", "fantasy", "horror", "animation", "documentary", "adventure", "superhero"
]

THEME_KEYWORDS = [
    "power", "freedom", "revenge", "hope", "grief", "identity", "love", "betrayal", "justice", "sacrifice", "friendship", "fear", "destiny", "redemption", "survival", "truth", "courage", "family"
]

MAX_RESULTS_PER_QUERY = 50
TARGET_LINKS = 20000
MAX_VIDEO_DURATION_SECONDS = 5 * 60  # 5 minutes

FILTER_KEYWORDS = [
    "top 10", "top10", "ranking", "recap", "trailer", "review", "reaction", "analysis", "watch before you die",
    "full movie", "explained", "summary", "breakdown", "interview", "hindi", "bollywood", "podcast",
    "bhojpuri", "punjabi", "kdrama", "episode", "e01", "s01", "season", "compilation", "moments",
    "funny", "shorts", "highlight", "tiktok"
]

# Additions for filtering relevance
ALLOW_KEYWORDS = [
    "scene", "dialogue", "clip", "moment", "conversation", "monologue", "final scene", "emotional moment", "iconic scene", "cinematic", "movie scene", "tv clip", "anime moment",
    # [list continues as in your original script...]
]

REJECT_KEYWORDS = [
    "motivational", "inspirational", "life lesson", "success", "fan edit", "reverb", "editz", "tribute", "amv", "gmv", "reaction", "interview", "trailer", "review", "explanation",
    "compilation", "vlog", "bgm", "podcast", "top 10", "commentary", "voiceover", "slowed", "shorts", "remix", "music video", "cover", "dance", "parody", "spoof", "recap", "summary",
    "explained", "ranking", "watch before you die", "full movie", "episode", "season", "e01", "s01", "moments", "funny", "highlight", "tiktok", "shorts"
]

ALLOWED_LANGS = ["en", "hi", "tm", "jp", "kr"]

def is_english(text):
    if not isinstance(text, str):
        return False
    ascii_chars = sum(1 for c in text if ord(c) < 128)
    return ascii_chars / max(len(text), 1) >= 0.75

def is_valid_title(title):
    return is_english(title) and len(title.split()) < 12

def load_existing_links(file_path="links.txt"):
    if not os.path.exists(file_path):
        return set()
    with open(file_path, "r", encoding="utf-8") as f:
        return set(line.strip() for line in f if line.strip())

def load_existing_metadata_links(csv_path="clip_metadata.csv"):
    if not os.path.exists(csv_path):
        return set()
    links = set()
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row.get("youtube_url")
            if url:
                links.add(url.strip())
    return links

def detect_language(text):
    try:
        lang = langdetect.detect(text)
        if lang in ALLOWED_LANGS:
            return lang
    except Exception:
        pass
    text_lower = text.lower()
    if "tamil" in text_lower:
        return "tm"
    if "hindi" in text_lower:
        return "hi"
    if "japanese" in text_lower:
        return "jp"
    if "korean" in text_lower:
        return "kr"
    if "english" in text_lower:
        return "en"
    return None

def main():
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY)

    existing_links = load_existing_links()
    print(f"🔁 Loaded {len(existing_links)} existing links from links.txt")

    processed_links = load_existing_metadata_links()
    print(f"🗂️ Loaded {len(processed_links)} links already in clip_metadata.csv")

    unique_links = set(existing_links)
    pbar = tqdm(total=TARGET_LINKS, initial=len(unique_links), desc="Collecting YouTube links")
    next_page_tokens = {kw: None for kw in SEARCH_KEYWORDS}
    exhausted_keywords = set()

    while len(unique_links) < TARGET_LINKS and len(exhausted_keywords) < len(SEARCH_KEYWORDS):
        for keyword in SEARCH_KEYWORDS:
            if keyword in exhausted_keywords:
                continue

            genre_kw = random.choice(GENRE_KEYWORDS)
            theme_kw = random.choice(THEME_KEYWORDS)
            search_kw = f"{keyword} {random.choice([genre_kw, theme_kw])}"

            try:
                search_response = youtube.search().list(
                    q=search_kw,
                    type="video",
                    videoDuration="short",
                    part="id,snippet",
                    maxResults=MAX_RESULTS_PER_QUERY,
                    pageToken=next_page_tokens[keyword] or ""
                ).execute()
            except Exception as e:
                if "quotaExceeded" in str(e):
                    print("🚫 Quota exceeded. Try again tomorrow.")
                    pbar.close()
                    return
                print(f"[ERROR] API error: {e}")
                time.sleep(5)
                continue

            video_ids = [item["id"]["videoId"] for item in search_response.get("items", [])]
            if not video_ids:
                exhausted_keywords.add(keyword)
                continue

            try:
                details_response = youtube.videos().list(
                    id=",".join(video_ids),
                    part="contentDetails,snippet,status"
                ).execute()
            except Exception as e:
                print(f"[ERROR] Details API error: {e}")
                continue

            for item in details_response.get("items", []):
                try:
                    duration = item["contentDetails"]["duration"]
                    seconds = int(isodate.parse_duration(duration).total_seconds())

                    if seconds > MAX_VIDEO_DURATION_SECONDS or seconds < 30:
                        continue

                    status = item["status"]
                    if status.get("privacyStatus") != "public":
                        continue
                    if status.get("uploadStatus") != "processed":
                        continue
                    if not status.get("embeddable", True):
                        continue

                    title = item["snippet"]["title"]
                    description = item["snippet"].get("description", "")
                    video_url = f"https://www.youtube.com/watch?v={item['id']}"

                    if "/shorts/" in video_url:
                        continue

                    text = f"{title} {description}".lower()
                    if not any(kw.lower() in text for kw in ALLOW_KEYWORDS):
                        continue
                    if any(kw.lower() in text for kw in REJECT_KEYWORDS):
                        continue

                    lang = detect_language(text)
                    if lang not in ALLOWED_LANGS:
                        continue

                    if video_url in processed_links or video_url in unique_links:
                        continue

                    unique_links.add(video_url)
                    with open("links.txt", "a", encoding="utf-8") as f:
                        f.write(video_url + "\n")
                    pbar.update(1)

                    if len(unique_links) >= TARGET_LINKS:
                        break

                except Exception as e:
                    print(f"[WARNING] Skipped a video due to error: {e}")
                    continue

            next_token = search_response.get("nextPageToken")
            if next_token:
                next_page_tokens[keyword] = next_token
            else:
                exhausted_keywords.add(keyword)

            time.sleep(random.uniform(0.5, 1.5))
            if len(unique_links) >= TARGET_LINKS:
                break

    pbar.close()
    print(f"\n✅ Total collected: {len(unique_links)} links.")
    print("📝 All saved to links.txt")

if __name__ == "__main__":
    main()
