"use client";

import { useCallback } from "react";
import type { PlayerState } from "@/hooks/usePlayer";

interface ControlsProps {
  state: PlayerState;
  currentTime: number;
  duration: number;
  isMuted: boolean;
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

export function Controls({
  state,
  currentTime,
  duration,
  isMuted,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onToggleMute,
}: ControlsProps) {
  const isPlaying = state === "playing";
  const isLoading = state === "loading";
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pct = parseFloat(e.target.value);
      onSeek((pct / 100) * duration);
    },
    [duration, onSeek]
  );

  return (
    <div className="controls" role="group" aria-label="Playback controls">
      
      {/* Progress / seek bar with combined timestamps */}
      <div className="progress-row">
        <div className="seek-bar-track" role="presentation">
          <input
            id="seek-bar"
            type="range"
            className="seek-bar"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          />
          {/* Visual fill */}
          <div
            className="seek-fill"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
        <span className="time-stamp" aria-label="Current and total time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Transport buttons */}
      <div className="transport-row">
        {/* Prev */}
        <button
          id="btn-prev"
          className="transport-btn transport-btn--secondary"
          onClick={onPrev}
          aria-label="Previous track"
          title="Previous track"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        {/* Play / Pause — Ensure your CSS targets 'transport-btn--primary' to give it the white circle background seen in the target image */}
        <button
          id="btn-play-pause"
          className={`transport-btn transport-btn--primary ${isLoading ? "transport-btn--loading" : ""}`}
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loader" aria-hidden="true" />
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

        {/* Next */}
        <button
          id="btn-next"
          className="transport-btn transport-btn--secondary"
          onClick={onNext}
          aria-label="Next track"
          title="Next track"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 18l8.5-6L6 6v12zm2.5-6L13 9v6l-4.5-3zM16 6h2v12h-2z" />
          </svg>
        </button>
      </div>

      {/* Sound-on nudge when muted */}
      {isMuted && (
        <button
          id="btn-sound-on-nudge"
          className="sound-nudge"
          onClick={onToggleMute}
          aria-label="Turn sound on"
        >
          <span className="sound-nudge-icon" aria-hidden="true">🔈</span>
          <span>tap for sound</span>
        </button>
      )}
    </div>
  );
}