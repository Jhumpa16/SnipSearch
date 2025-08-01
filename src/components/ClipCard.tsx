import React, { useState, useRef, useEffect } from "react";

type Clip = {
  id: string;
  title: string;
  mood?: string;
  genre?: string;
  theme?: string;
  score?: number;
  tags?: string[];
  duration?: number;
  thumbnail?: string;
  similarity?: number;
  category?: string;
  description?: string;
  subtitle?: string;
  youtube_url?: string;
};

interface ClipCardProps {
  clip: Clip;
}

export default function ClipCard({ clip }: ClipCardProps) {
  const { title, tags, thumbnail, mood, category, theme, score, similarity, description, subtitle, youtube_url } = clip;
  
  // State for hover video functionality
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State for share functionality
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const videoId = youtube_url ? extractVideoId(youtube_url) : null;

  // Generate embed URL with autoplay and mute
  const getEmbedUrl = () => {
    if (!videoId) return '';
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${videoId}`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Delay showing video to prevent flickering on quick hovers
    hoverTimeoutRef.current = setTimeout(() => {
      setShowVideo(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    
    // Clear timeout if still pending
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Handle share button click
  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!youtube_url) return;
    
    try {
      await navigator.clipboard.writeText(youtube_url);
      setShowCopiedTooltip(true);
      
      // Hide tooltip after 2 seconds
      setTimeout(() => {
        setShowCopiedTooltip(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Remove pink tags
  // const mainTags = tags || [];
  const hashtags = tags || [];
  const fallbackThumb =
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=225&q=80";

  const cardContent = (
    <div
      className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden w-full max-w-xs sm:w-64 mx-auto flex flex-col hover:scale-105 hover:shadow-[0_0_16px_2px_rgba(168,85,247,0.3)] transition-all duration-200 cursor-pointer border border-zinc-800 hover:border-purple-500 font-inter min-h-[380px] relative"
      style={{ minHeight: 380, height: 380 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-48 bg-zinc-800 flex items-center justify-center overflow-hidden relative">
        {/* Original thumbnail */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className={`w-full h-48 object-cover rounded-t-xl transition-opacity duration-300 ${
              showVideo ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : (
          <img
            src={fallbackThumb}
            alt="Fallback thumbnail"
            className={`w-full h-48 object-cover rounded-t-xl opacity-80 transition-opacity duration-300 ${
              showVideo ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Video Player (shown on hover) */}
        {showVideo && videoId && (
          <iframe
            src={getEmbedUrl()}
            className="absolute inset-0 w-full h-full rounded-t-xl"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            style={{ pointerEvents: 'none' }} // Prevent iframe from capturing mouse events
          />
        )}

        {/* Play icon overlay (visible when not hovering) */}
        {!showVideo && youtube_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white/90 rounded-full p-3 transform scale-75 hover:scale-100 transition-transform duration-200">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}

        {/* Hover indicator */}
        {isHovered && showVideo && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
            LIVE
          </div>
        )}

        {/* Share Button */}
        {youtube_url && (
          <button
            onClick={handleShareClick}
            className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 z-10"
            title="Copy link"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        )}

        {/* Copied Tooltip */}
        {showCopiedTooltip && (
          <div className="absolute top-12 left-2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg z-20 whitespace-nowrap">
            ✔️ Link Copied!
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="text-white text-base font-semibold line-clamp-2 min-h-[2.7em]">{title}</h2>
        {(subtitle || description) && (
          <div className="text-zinc-400 text-xs line-clamp-2 min-h-[1.7em]">{subtitle || description}</div>
        )}
        <div className="flex flex-wrap gap-2 mt-1">
          {mood && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 font-medium shadow hover:scale-105 transition-transform">{mood}</span>
          )}
          {category && (
            <span className="bg-yellow-400 text-black text-xs rounded-full px-2 py-1 font-medium shadow hover:scale-105 transition-transform">{category}</span>
          )}
          {theme && (
            <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 font-medium shadow hover:scale-105 transition-transform">{theme}</span>
          )}
          {typeof similarity === 'number' && (
            <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 font-bold shadow hover:scale-105 transition-transform">{similarity.toFixed(2)}</span>
          )}
        </div>
        {/* Pink tags removed */}
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {hashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="bg-zinc-800 rounded-md text-gray-300 text-xs px-2 py-0.5"
              >
                #{hashtag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return youtube_url ? (
    <a
      href={youtube_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {cardContent}
    </a>
  ) : (
    cardContent
  );
}





