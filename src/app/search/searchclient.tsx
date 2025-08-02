'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipCard from '../../components/ClipCard';
import NavBar from '../../components/NavBar';
import { useRouter, useSearchParams } from 'next/navigation';
import "@fontsource-variable/inter";

interface Clip {
  id: string;
  title: string;
  mood?: string;
  genre?: string;
  theme?: string;
  tags?: string[];
  category?: string;
  youtube_url: string;
  duration?: number;
  score?: number;
  similarity?: number;
  timestamp?: number;
}

const SearchClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();

  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClips = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
        setClips(response.data);
      } catch (error) {
        console.error('Error fetching clips:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClips();
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <div className="max-w-6xl mx-auto p-4 pt-24">
        <h1 className="text-3xl font-bold mb-6">Search Results for: "{query}"</h1>
        {loading && <p className="text-gray-400">Loading clips...</p>}
        {!loading && clips.length === 0 && <p>No clips found.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clips.map((clip, index) => (
            <ClipCard
              key={`${clip.youtube_url}-${'timestamp' in clip && clip.timestamp !== undefined ? clip.timestamp : index}`}
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
      </div>
    </div>
  );
};

export default SearchClient;
