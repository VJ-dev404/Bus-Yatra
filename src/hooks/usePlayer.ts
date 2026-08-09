"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Track } from "@/types/playlist";

export type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";

export interface UsePlayerReturn {
  /** Currently active track */
  currentTrack: Track | null;
  /** Playback state */
  state: PlayerState;
  /** Current playback position in seconds */
  currentTime: number;
  /** Total track duration in seconds */
  duration: number;
  /** Whether audio is muted */
  isMuted: boolean;
  /** Play the current track */
  play: () => void;
  /** Pause the current track */
  pause: () => void;
  /** Toggle play/pause */
  togglePlay: () => void;
  /** Seek to a specific time (seconds) */
  seekTo: (time: number) => void;
  /** Skip to the next track */
  nextTrack: () => void;
  /** Skip to the previous track */
  prevTrack: () => void;
  /** Load a specific track by index */
  loadTrack: (index: number) => void;
  /** Toggle mute */
  toggleMute: () => void;
  /** Current track index */
  trackIndex: number;
}

export function usePlayer(tracks: Track[]): UsePlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [state, setState] = useState<PlayerState>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // FIX 1: Default state is now unmuted
  const [isMuted, setIsMuted] = useState(false); 

  // Initialize audio element once on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audio.preload = "auto";
    
    // FIX 2: Ensure the HTML audio element starts unmuted
    audio.muted = false; 
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onPlay = () => setState("playing");
    const onPause = () => setState("paused");
    const onWaiting = () => setState("loading");
    const onCanPlay = () => {
      if (audioRef.current?.paused === false) setState("playing");
    };
    const onError = () => setState("error");
    const onEnded = () => {
      // Auto-advance to next track like a cassette flip
      setTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load new track whenever trackIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks[trackIndex]) return;
    const track = tracks[trackIndex];
    const wasPlaying = !audio.paused;

    audio.src = track.audioUrl;
    setCurrentTime(0);
    setDuration(0);
    setState("loading");

    if (wasPlaying || trackIndex !== 0) {
      // Keep playing if we were already playing (track ended → next)
      audio.play().catch(() => setState("paused"));
    } else {
      // First load: try autoplay (may be blocked by browser until interacted with)
      audio.play().catch(() => setState("paused"));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    // FIX 3: Force unmute when play is called directly
    audioRef.current.muted = false;
    setIsMuted(false);
    audioRef.current.play().catch(() => setState("paused"));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      // FIX 4: Force unmute when toggling play
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.play().catch(() => setState("paused"));
    } else {
      audioRef.current.pause();
    }
  }, []);

  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const nextTrack = useCallback(() => {
    setTrackIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  const prevTrack = useCallback(() => {
    setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  const loadTrack = useCallback((index: number) => {
    setTrackIndex(index);
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMuted = !audioRef.current.muted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  }, []);

  return {
    currentTrack: tracks[trackIndex] ?? null,
    state,
    currentTime,
    duration,
    isMuted,
    play,
    pause,
    togglePlay,
    seekTo,
    nextTrack,
    prevTrack,
    loadTrack,
    toggleMute,
    trackIndex,
  };
}