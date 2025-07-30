import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

export async function searchClips({
    query_embedding,
    match_count,
    filter_mood = null,
    filter_genre = null,
    filter_theme = null,
    filter_category = null,
    max_duration = null,
    min_similarity = 0.75,
    query_text = '',
  }: {
    query_embedding: number[];
    match_count: number;
    filter_mood?: string | null;
    filter_genre?: string | null;
    filter_theme?: string | null;
    filter_category?: string | null;
    max_duration?: number | null;
    min_similarity?: number;
    query_text?: string;
  }) {
    const { data, error } = await supabaseServer.rpc('match_vector', {
      query_embedding,
      match_count,
      filter_mood,
      filter_genre,
      filter_theme,
      filter_category,
      max_duration,
      min_similarity,
      query_text,
    });
  
    if (error) {
      console.error('🛑 Supabase RPC error:', error);
      throw error;
    }
  
    return data;
  }
  

