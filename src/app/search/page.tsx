'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipCard from '../../components/ClipCard';
import NavBar from '../../components/NavBar';
import { useRouter, useSearchParams } from 'next/navigation';
import "@fontsource-variable/inter";

interface Clip {
  id: string;
  youtube_url: string;
  title: string;
  tags: string[] | null;
  mood: string | null;
  category: string | null;
  genre: string | null;
  theme: string | null;
  score: number;
  similarity?: number;
}

// Trending/Hot searches - hardcoded for now
const TRENDING_SEARCHES = ['villain speech', 'anime betrayal', 'epic fight', 'sad goodbye'];

// Helper to infer filters from prompt
function inferFiltersFromPrompt(prompt: string): {
  mood: string | null,
  category: string | null,
  theme: string | null,
  genre: string | null
} {
  const lower = prompt.toLowerCase();
  let mood: string | null = null;
  let category: string | null = null;
  let theme: string | null = null;
  let genre: string | null = null;

  if (/(funny|humor|laugh|comedy|hilarious|joke)/.test(lower)) mood = 'Humorous';
  else if (/(dark|grim|serious|intense)/.test(lower)) mood = 'Dark';
  else if (/(tense|suspense|thrill|excite|exciting)/.test(lower)) mood = 'Tense';
  else if (/(romantic|love|cute|sweet)/.test(lower)) mood = 'Romantic';
  else if (/(sad|emotional|cry|tear)/.test(lower)) mood = 'Emotional';

  if (/(anime)/.test(lower)) category = 'Anime';
  else if (/(movie|film|cinema)/.test(lower)) category = 'Movie';
  else if (/(tv|series|sitcom|show|office)/.test(lower)) category = 'TV Show';
  else if (/(cartoon|animation)/.test(lower)) category = 'Cartoon';

  if (/(fight|battle|conflict|duel|versus|vs)/.test(lower)) theme = 'Conflict';
  else if (/(revenge|vengeance|payback)/.test(lower)) theme = 'Revenge';
  else if (/(friendship|friends|buddies|teamwork)/.test(lower)) theme = 'Friendship';
  else if (/(love|romance|relationship)/.test(lower)) theme = 'Love';
  else if (/(betrayal|traitor|deceit)/.test(lower)) theme = 'Betrayal';

  if (/(comedy|funny|sitcom)/.test(lower)) genre = 'Comedy';
  else if (/(thriller|suspense|dark)/.test(lower)) genre = 'Thriller';
  else if (/(action|fight|battle|war)/.test(lower)) genre = 'Action';
  else if (/(romance|love|romantic)/.test(lower)) genre = 'Romance';
  else if (/(drama|emotional|tear|sad)/.test(lower)) genre = 'Drama';
  else if (/(horror|scary|fear)/.test(lower)) genre = 'Horror';

  return { mood, category, theme, genre };
}

const SearchPage = () => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchLimitReached, setSearchLimitReached] = useState(false);
  const [page, setPage] = useState(0); // For pagination
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // New state for load more loading

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('search_count') || '0', 10);
    if (count >= 5) {
      setSearchLimitReached(true);
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (query) fetchResults(query, 0, true);
  }, [query]);

  const fetchResults = async (q: string, pageIndex = 0, reset = false) => {
    if (!q.trim()) return;

    let count = parseInt(localStorage.getItem('search_count') || '0', 10);
    if (count >= 30) {
      alert("You&apos;ve reached your free limit of 30 searches. Please upgrade.");
      return;
    }

    if (reset) {
      count++;
      localStorage.setItem('search_count', count.toString());
    }

    // Set appropriate loading state
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    setError(null);
    const filters = inferFiltersFromPrompt(q);

    try {
      const res = await axios.post('/api/search', {
        query: q,
        match_count: 12,
        offset: pageIndex * 12,
        filter_mood: filters.mood,
        filter_genre: filters.genre,
        filter_theme: filters.theme,
        filter_category: filters.category,
        max_duration: 600.0,
        min_similarity: 0.3,
      });

      const results = res.data.data || res.data.results || [];

      if (reset) {
        setClips(results);
      } else {
        setClips((prev) => [...prev, ...results]);
      }

      if (results.length < 12) setHasMore(false);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLimitReached) return;
    if (query.trim()) {
      const newQuery = encodeURIComponent(query);
      const currentQuery = searchParams.get('q');
  
      // Update URL without scrolling or full reload
      if (currentQuery !== newQuery) {
        router.replace(`/search?q=${newQuery}`);
      }
  
      setPage(0);
      setHasMore(true);
      fetchResults(query, 0, true);
    }
  };

  // Handle trending search click
  const handleTrendingClick = (trendingQuery: string) => {
    if (searchLimitReached) return;
    
    setQuery(trendingQuery);
    const encodedQuery = encodeURIComponent(trendingQuery);
    router.replace(`/search?q=${encodedQuery}`);
    
    setPage(0);
    setHasMore(true);
    fetchResults(trendingQuery, 0, true);
  };
  
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(query, nextPage);
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <NavBar />
      <div className="pt-20 max-w-6xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="flex items-center justify-center mb-6 w-full">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search memes, moods, iconic moments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full bg-zinc-900 text-white px-6 py-3 pr-14 text-lg focus:outline-none focus:ring-2 ring-purple-500 shadow-md placeholder-zinc-400 transition-all border-2 border-transparent focus:border-purple-500 focus:shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]"
              style={{ fontFamily: 'Inter, DM Sans, sans-serif' }}
              disabled={searchLimitReached}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Search"
              disabled={searchLimitReached}
            >
              <span className="text-xl">🔍</span>
            </button>
          </div>
        </form>

        {/* Trending Searches Component */}
        <div className="flex flex-col items-center mb-10">
          <h3 className="text-sm font-medium text-zinc-400 mb-3">🔥 Trending Searches</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {TRENDING_SEARCHES.map((trendingQuery) => (
              <button
                key={trendingQuery}
                onClick={() => handleTrendingClick(trendingQuery)}
                disabled={searchLimitReached}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full text-sm transition-all duration-200 border border-zinc-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
              >
                {trendingQuery}
              </button>
            ))}
          </div>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-zinc-900 rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border-2 border-purple-500">
              <h2 className="text-2xl font-bold mb-4 text-white">You&apos;ve reached your free limit</h2>
              <p className="text-zinc-300 mb-6">Sign up to continue using SnipSearch.</p>
              <button
                onClick={handleSignUp}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full transition-colors"
              >
                Sign Up & Upgrade
              </button>
            </div>
          </div>
        )}

        {loading && clips.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              <span className="animate-spin text-4xl">🌀</span>
            </div>
            <div className="text-lg text-zinc-300 animate-pulse">Fetching clips...</div>
          </div>
        )}

        {error && <p className="text-red-400 text-center mb-4 animate-fade-in">{error}</p>}

        {!loading && !error && (
          <div className="animate-fade-in">
            {Array.isArray(clips) && clips.length > 0 ? (
              <>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-10 justify-items-center">
  {clips.map((clip, index) => (
    <ClipCard
      key={`${clip.youtube_url}-${String(clip.timestamp ?? index)}`}
      clip={{
        ...clip,
        mood: clip.mood ?? undefined,
        genre: clip.genre ?? undefined,
        theme: clip.theme ?? undefined,
        score: clip.score ?? undefined,
        similarity: clip.similarity ?? undefined,
        tags: clip.tags ?? undefined,
        category: clip.category ?? undefined,
        thumbnail: undefined
      }}
    />
  ))}
</div>

                {hasMore && (
                  <div className="flex justify-center mb-12">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full transition-colors flex items-center gap-2"
                    >
                      {loadingMore ? (
                        <>
                          <span className="animate-spin text-sm">🌀</span>
                          Loading...
                        </>
                      ) : (
                        'Load More'
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-zinc-300 text-center text-lg mt-12">No clips found for &apos;{query}&apos;. Try a different prompt.</p>
            )}
          </div>
        )}

        <style jsx global>{`
          .animate-fade-in {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          body, html {
            font-family: 'Inter', 'DM Sans', sans-serif;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SearchPage;


