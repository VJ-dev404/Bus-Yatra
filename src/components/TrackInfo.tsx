"use client";

import type { Track } from "@/types/playlist";

interface TrackInfoProps {
  track: Track;
}

export function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="track-info" aria-live="polite" aria-atomic="true">
      <h1 className="track-title">{track.title}</h1>
      <p className="track-artist">
        <span className="track-artist-name">{track.artist}</span>
        {track.album && (
          <>
            <span className="track-separator" aria-hidden="true"> · </span>
            <span className="track-album">{track.album}</span>
          </>
        )}
        {track.year && (
          <>
            <span className="track-separator" aria-hidden="true"> · </span>
            <span className="track-year">{track.year}</span>
          </>
        )}
      </p>
    </div>
  );
}
