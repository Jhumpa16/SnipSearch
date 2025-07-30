import os
from dotenv import load_dotenv
import praw

# ✅ Load credentials
load_dotenv(".env.reddit")
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT"),
)

# ✅ Define categories and subreddits
config = {
    "link_anime.txt": ["anime", "goodanimememes", "animefights", "animeclips"],
    "link_memes.txt": ["memes", "IndianDankMemes", "dankmemes", "okbuddybollywood"],
    "link_bollywood.txt": ["BollywoodMemes", "BollywoodRealism", "desimemes"],
    "link_hollywood.txt": ["MovieDetails", "movieclips", "MovieMemes", "classicmemes"]
}

# ✅ Allowed domains and filters
allowed_domains = ["youtube.com", "youtu.be"]
banned_keywords = ["edit", "repost", "shorts", "vertical", "tiktok", "instagram"]

def is_valid_url(url: str, title: str):
    url = url.lower()
    title = title.lower()
    return (
        any(domain in url for domain in allowed_domains) and
        not any(bad in url for bad in banned_keywords) and
        not any(bad in title for bad in banned_keywords)
    )

def clean_url(url):
    if "youtube.com" in url and "&" in url:
        return url.split("&")[0]
    return url

# ✅ Start collecting
for filename, subreddits in config.items():
    print(f"\n🔍 Scraping for {filename}")
    collected = set()
    
    for sub in subreddits:
        try:
            for post in reddit.subreddit(sub).hot(limit=150):
                if is_valid_url(post.url, post.title):
                    clean = clean_url(post.url)
                    collected.add(clean)
        except Exception as e:
            print(f"⚠️ Error with subreddit '{sub}':", e)

    # ✅ Save results
    with open(filename, "w", encoding="utf-8") as f:
        for url in sorted(collected):
            f.write(url + "\n")

    print(f"✅ Saved {len(collected)} links to {filename}")
