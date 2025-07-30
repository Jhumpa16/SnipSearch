export function getYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }
  