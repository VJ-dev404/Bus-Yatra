"use client";

import Link from "next/link";
import { SPOTIFY_PLAYLIST_URL, YT_MUSIC_PLAYLIST_URL } from "@/data/playlist";
import { useClock } from "@/hooks/useClock";
import { useVisitors } from "@/hooks/useVisitors";

export function Header() {
  const time = useClock();
  const visitors = useVisitors();

  return (
    <header className="site-header" role="banner">
      {/* LEFT — Real-time IST clock */}
      <div className="header-clock" aria-label="Current time in India">
        <span className="clock-display">{time || "—"}</span>
      </div>

      {/* CENTER — Live visitor count */}
      <div className="header-visitors" aria-live="polite" aria-label="Live visitors">
        <span className="visitors-dot" aria-hidden="true" />
        {visitors !== null ? (
          <span className="visitors-count">
            <strong>{visitors}</strong> online
          </span>
        ) : (
          <span className="visitors-count">connecting…</span>
        )}
      </div>

      {/* RIGHT — External playlist links */}
      <nav className="header-links" aria-label="External playlists">
        <Link
          id="link-spotify"
          href={SPOTIFY_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="header-link header-link--spotify"
          aria-label="Open playlist on Spotify"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="platform-icon" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115.294.181.387.563.207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .52-.972c3.632-1.102 8.147-.568 11.233 1.328a.78.78 0 0 1 .257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 1 1-.543-1.793c3.563-1.08 9.484-.871 13.22 1.37a.937.937 0 0 1-.06 1.58z" />
          </svg>
          <span>Spotify</span>
        </Link>

        <Link
          id="link-yt-music"
          href={YT_MUSIC_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="header-link header-link--yt"
          aria-label="Open playlist on YouTube Music"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="platform-icon" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
          </svg>
          <span>YT Music</span>
        </Link>
      </nav>
    </header>
  );
}
