"use client";

import Image from "next/image";
import type { Track } from "@/types/playlist";

interface CassetteArtProps {
  track: Track;
  isPlaying: boolean;
}

export function CassetteArt({ track, isPlaying }: CassetteArtProps) {
  return (
    <div className="cassette-art-wrapper" aria-label={`Album art for ${track.title}`}>
      {/* Main cover art */}
      <div className={`cassette-art ${isPlaying ? "cassette-art--playing" : ""}`}>
        <Image
          src={track.coverUrl}
          alt={`${track.title} by ${track.artist}`}
          width={380}
          height={380}
          className="cassette-cover-img"
          priority
        />

        {/* Cassette spool overlay — purely decorative */}
        <div className="cassette-spool-bar" aria-hidden="true">
          <div className="cassette-spool-row">
            <div className={`spool spool--left ${isPlaying ? "spool--spinning" : ""}`}>
              <span className="spool-hub" />
            </div>
            <div className="cassette-label">
              <span className="cassette-label-title">{track.title.substring(0, 16)}</span>
              <span className="cassette-label-side">SIDE A</span>
            </div>
            <div className={`spool spool--right ${isPlaying ? "spool--spinning" : ""}`}>
              <span className="spool-hub" />
            </div>
          </div>
          {/* Tape window */}
          <div className="tape-window">
            <div className="tape-ribbon" />
          </div>
        </div>
      </div>

      {/* Glow behind the art when playing */}
      {isPlaying && <div className="cassette-glow" aria-hidden="true" />}
    </div>
  );
}
