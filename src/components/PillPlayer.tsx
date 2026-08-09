"use client";

import Image from "next/image";
import { useCallback } from "react";
import type { PlayerState } from "@/hooks/usePlayer";
import type { Track } from "@/types/playlist";

interface PillPlayerProps {
  track: Track;
  state: PlayerState;
  currentTime: number;
  duration: number;
  isMuted: boolean; // Kept for prop compatibility, but removed from UI
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PillPlayer({
  track,
  state,
  currentTime,
  duration,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
}: PillPlayerProps) {
  const isPlaying = state === "playing";
  const isLoading = state === "loading";
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSeek((parseFloat(e.target.value) / 100) * duration);
    },
    [duration, onSeek]
  );

  return (
    <div className="pill-player">
      
      {/* ── LEFT: Cover Art with CD Hole ── */}
      <div className="pill-art-wrap">
        <Image
          src={track.coverUrl}
          alt={track.title}
          // 1. Tell Next.js to fetch a high-res 256x256 image 
          // (Your CSS will still force it to display at 84x84)
          width={256}  
          height={256}
          // 2. Override the default 75% compression and force maximum quality
          quality={100} 
          className={`pill-art ${isPlaying ? "is-playing" : ""}`}
          priority
        />
        {/* The cool inner CD/vinyl ring */}
        <span className="pill-art-hole" aria-hidden="true" />
      </div>

      {/* ── MIDDLE: Info, Seek Bar, and Time ── */}
      <div className="pill-center-block">
        <span className="pill-title">{track.title}</span>
        <span className="pill-artist">{track.artist}</span>

        <div className="pill-seek-wrap" aria-hidden="true">
          <div className="pill-seek-track">
            <input
              id="pill-seek"
              type="range"
              className="pill-seek-input"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              aria-label="Seek"
            />
            <div className="pill-seek-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <span className="pill-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* ── RIGHT: Transport Controls ── */}
      <div className="pill-controls">
        <button id="btn-prev" className="pill-btn pill-btn--secondary" onClick={onPrev} aria-label="Previous track">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <button
          id="btn-play-pause"
          className="pill-btn pill-btn--play"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="pill-loader" aria-hidden="true" />
          ) : isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button id="btn-next" className="pill-btn pill-btn--secondary" onClick={onNext} aria-label="Next track">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {/* Cleaned up Skip-Forward path */}
            <path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" />
          </svg>
        </button>
      </div>

    </div>
  );
}