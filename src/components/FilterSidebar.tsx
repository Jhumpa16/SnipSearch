"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const moods = ["Any", "Powerful", "Humorous", "Tragic", "Uplifting"];
const genres = ["Any", "Drama", "Comedy", "Action", "Romance"];
const themes = ["Any", "Power", "Friendship", "Grief", "Courage"];
const categories = ["Any", "Anime", "Hollywood", "Independent", "Vintage"];

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mood, setMood] = useState(searchParams.get("mood") || "Any");
  const [genre, setGenre] = useState(searchParams.get("genre") || "Any");
  const [theme, setTheme] = useState(searchParams.get("theme") || "Any");
  const [category, setCategory] = useState(searchParams.get("category") || "Any");
  const [duration, setDuration] = useState(searchParams.get("duration") || "5");

  // Update URL when filters change
  useEffect(() => {
    const q = searchParams.get("q") || "";

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (mood !== "Any") params.set("mood", mood);
    if (genre !== "Any") params.set("genre", genre);
    if (theme !== "Any") params.set("theme", theme);
    if (category !== "Any") params.set("category", category);
    if (duration !== "5") params.set("duration", duration);

    router.push(`/search?${params.toString()}`);
  }, [mood, genre, theme, category, duration]);

  return (
    <aside className="sticky top-16 left-0 w-full md:w-64 max-h-full overflow-auto bg-zinc-900 rounded-xl shadow-2xl px-6 py-8 flex flex-col gap-8 z-30 ml-4 mt-28">
      <h2 className="text-xl font-bold text-white mb-6">Filter</h2>
      <div className="flex flex-col gap-6">
        {/* Mood */}
        <div>
          <label className="block text-white font-semibold mb-2">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:ring-2 focus:ring-purple-500"
          >
            {moods.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-white font-semibold mb-2">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:ring-2 focus:ring-purple-500"
          >
            {genres.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-white font-semibold mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:ring-2 focus:ring-purple-500"
          >
            {themes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-white font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-white font-semibold mb-2">Duration (min)</label>
          <input
            type="range"
            min={0}
            max={5}
            step={0.1}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full accent-purple-500 h-2 bg-zinc-800 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>0</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
