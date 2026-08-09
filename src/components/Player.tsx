"use client";

import { usePlayer } from "@/hooks/usePlayer";
import { playlist } from "@/data/playlist";
import { Header } from "@/components/Header";
import { PillPlayer } from "@/components/PillPlayer";

export default function Player() {
  const {
    currentTrack,
    state,
    currentTime,
    duration,
    isMuted,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    toggleMute,
  } = usePlayer(playlist);

  if (!currentTrack) return null;

  return (
    <div className="app-shell">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Road lines at bottom */}
      <div className="road-strip" aria-hidden="true">
        <div className="road-line road-line--1" />
        <div className="road-line road-line--2" />
        <div className="road-line road-line--3" />
      </div>

      {/* ── TOP: Header bar ── */}
      <Header />

      {/* ── MIDDLE: Empty spacer to preserve layout and push bottom bar down ── */}
      <main className="hero-stage" style={{ flexGrow: 1 }}></main>

      {/* ── BOTTOM: Pill player bar ── */}
      <div className="bottom-bar">
        <PillPlayer
          track={currentTrack}
          state={state}
          currentTime={currentTime}
          duration={duration}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onNext={nextTrack}
          onPrev={prevTrack}
          onSeek={seekTo}
          onToggleMute={toggleMute}
        />
      </div>
    </div>
  );
}