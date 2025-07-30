import subprocess
import json
import csv

QUERIES = [
    # 🎬 Movies - Iconic comedy scenes
    "step brothers bunk bed collapse scene",
    "anchorman fight scene",
    "superbad liquor store scene",
    "mean girls burn book scene",
    "the hangover funny scenes",
    "dumb and dumber most funny scene",
    "bridesmaids airplane scene",
    "tropic thunder simple jack scene",
    "21 jump street funniest moments",
    "deadpool breaking the fourth wall scene",
    "liar liar pen scene",
    "ace ventura rhino scene",
    "white chicks yo mama joke scene",
    "horrible bosses interview scene",
    
    # 📺 Sitcoms - Popular meme/funny scenes
    "the office michael fire drill scene",
    "the office scott's tots scene",
    "brooklyn nine nine full funny scenes",
    "friends pivot couch scene",
    "friends joey speaking french scene",
    "modern family phil dumb moments",
    "how i met your mother slap bet scene",
    "parks and rec treat yo self scene",
    "seinfeld george marine biologist scene",
    "schitt's creek david ew scene",

    # 📼 Cartoons
    "family guy dark humor scenes",
    "family guy peter vs chicken full fight",
    "rick and morty funniest moments",
    "pickle rick escape scene",
    "south park funniest uncensored scenes",
    "spongebob imagination box scene",
    "spongebob ripped pants scene",
    "simpsons homer backing into bush",
    "bojack horseman funny scenes",

    # 🎌 Anime - Meme content
    "funniest anime scenes ever",
    "anime awkward silence moment",
    "gintama dark humor scene",
    "konosuba explosion funny scene",
    "one piece zoro lost again scene",
    "jojo bizarre adventure oh no scene",
    "death note potato chip scene",
    "naruto swing meme scene",
    "attack on titan awkward moment",
    "mob psycho funny face scene",
]

BAD_KEYWORDS = [
    "shorts", "reaction", "edit", "vertical", "trailer", 
    "fan made", "compilation", "remix", "tiktok", "reel", "recap"
]

OUTPUT_FILE = "meme_funny_links.csv"

def is_valid(title, duration):
    title = title.lower()
    if not (60 <= duration <= 300):
        return False
    return not any(bad in title for bad in BAD_KEYWORDS)

def collect_links():
    collected = set()

    for query in QUERIES:
        print(f"🔍 Searching: {query}")
        cmd = ["yt-dlp", f"ytsearch20:{query}", "--dump-json"]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True)

        for line in result.stdout.strip().split('\n'):
            try:
                video = json.loads(line)
                title = video.get("title", "")
                duration = video.get("duration", 0)
                url = video.get("webpage_url")
                print(f"   ⏱ {duration}s | {title}")
                if is_valid(title, duration) and url:
                    collected.add(url)
            except:
                continue

    with open(OUTPUT_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        for url in collected:
            writer.writerow([url])

    print(f"\n✅ {len(collected)} links collected and saved to {OUTPUT_FILE}.")


if __name__ == "__main__":
    collect_links()














