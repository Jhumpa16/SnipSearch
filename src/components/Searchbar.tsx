"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    setSearchInput(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    // Update query
    if (searchInput.trim()) {
      params.set("q", searchInput.trim());
    } else {
      params.delete("q");
    }

    // Keep existing filters or set defaults if not present
    if (!params.get("mood")) params.set("mood", "Any");
    if (!params.get("genre")) params.set("genre", "Any");
    if (!params.get("theme")) params.set("theme", "Any");
    if (!params.get("category")) params.set("category", "Any");
    if (!params.get("duration")) params.set("duration", "600");


    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 max-w-xl mx-auto mb-8"
    >
      <input
        type="text"
        placeholder="Search for a clip..."
        className="flex-1 px-4 py-2 rounded-l-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-r-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold flex items-center gap-1 border border-cyan-700"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </form>
  );
}

