import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

type SearchRequest = {
  query: string;
  mood?: string | null;
  genre?: string | null;
  theme?: string | null;
  category?: string | null;
  duration?: string;
  page?: number; // ✅ NEW: page param for pagination
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SearchRequest;
    const { query, mood, genre, theme, category, duration, page = 1 } = body;

    if (!query || typeof query !== "string") {
      console.error("❌ Invalid or missing query:", query);
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const limit = 20;
    const offset = (page - 1) * limit;

    console.log("🔍 Incoming query:", query);
    console.log(
      "🧾 Filters — Mood:",
      mood,
      "Genre:",
      genre,
      "Theme:",
      theme,
      "Category:",
      category,
      "Duration:",
      duration,
      "Page:",
      page
    );

    // === 1. Generate embedding ===
    const embeddingResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-embedding`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      }
    );

    if (!embeddingResponse.ok) {
      const errText = await embeddingResponse.text();
      throw new Error(`Embedding generation failed: ${errText}`);
    }

    const embeddingData = await embeddingResponse.json();
    const embedding: number[] = embeddingData.embedding?.map((x: any) =>
      Number(x)
    );

    if (!embedding || embedding.length !== 384) {
      console.error("⚠️ Invalid embedding:", embedding?.length);
      return NextResponse.json(
        { error: "Invalid embedding returned" },
        { status: 500 }
      );
    }

    console.log("✅ Embedding generated, first 5:", embedding.slice(0, 5));

    // === 2. Query Supabase match_vector function with pagination ===
    const rpcParams = {
      query_embedding: embedding,
      match_count: limit + offset, // Supabase will return more rows, we'll slice after
      filter_mood: mood || null,
      filter_genre: genre || null,
      filter_theme: theme || null,
      filter_category: category || null,
      max_duration:
        duration && duration !== "Any" ? parseFloat(duration) : 600.0,
      min_similarity: 0.3,
      query_text: query,
    };

    const { data, error } = await supabaseServer.rpc("match_vector", rpcParams);

    if (error) {
      console.error("🛑 Supabase RPC error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`🎯 Returned ${data?.length} matched clips`);

    // ✅ Slice the paginated chunk from total results
    const paginatedData = data?.slice(offset, offset + limit);

    return NextResponse.json({ data: paginatedData }, { status: 200 });
  } catch (err: any) {
    console.error("🚨 API error:", err.message || err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}



