/**
 * Core type definitions for the Bus Stop playlist.
 * Add new tracks by extending the playlist array in data/playlist.ts
 */

export interface Track {
  /** Unique identifier for the track */
  id: string;

  /** Song title as it would appear on a cassette label */
  title: string;

  /** Artist / singer name */
  artist: string;

  /** Film / album name (optional) */
  album?: string;

  /** Year of release (optional) */
  year?: number;

  /**
   * URL to the square cover image.
   * Use /images/covers/ for local assets, or an absolute URL.
   */
  coverUrl: string;

  /**
   * URL to the audio file.
   * ⚠️  REPLACE with actual track URLs. Use royalty-free or licensed sources only.
   * Supported formats: mp3, ogg, wav (anything the browser <audio> tag supports).
   * Example: "https://cdn.example.com/tracks/song-name.mp3"
   */
  audioUrl: string;

  /** Deep-link to the Spotify track (optional — shows on individual track) */
  spotifyUrl?: string;

  /** Deep-link to the YouTube Music track (optional) */
  ytMusicUrl?: string;
}
