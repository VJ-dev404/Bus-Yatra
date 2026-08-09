# 🚌 Bus Stop

> *Nostalgia on repeat. The songs that blasted from cassette decks on Indian state buses — driver's collection, conductor's whistle, last seat by the window.*

A minimal, mood-driven 90s Bollywood music player built with Next.js. One song at a time, cycling through your playlist like flipping cassette sides.

---

## ✨ Features

- Warm, dusty road-trip aesthetic — sun-bleached yellows, faded MSRTC green, rust orange
- Cassette-spool animation while playing
- Muted autoplay → "tap for sound" nudge (respects browser policies)
- Auto-advances to next track when one ends
- Track-dot navigator + prev/next controls
- Links to your Spotify and YouTube Music playlists
- Fully responsive, single-screen, no scroll

---

## 🎵 Adding Tracks

Edit **`src/data/playlist.ts`**:

```ts
{
  id: "track-04",                          // unique string ID
  title: "Kuch Kuch Hota Hai",
  artist: "Udit Narayan & Kavita Krishnamurthy",
  album: "Kuch Kuch Hota Hai",
  year: 1998,
  coverUrl: "/images/covers/track4.png",  // local: place in public/images/covers/
  audioUrl: "https://cdn.example.com/path/to/track.mp3",  // ⚠️ licensed URL
  spotifyUrl: "https://open.spotify.com/track/YOUR_ID",
  ytMusicUrl: "https://music.youtube.com/watch?v=YOUR_ID",
}
```

> **⚠️ Audio URL Note**: Only use audio URLs you have the right to play — e.g. your own CDN, royalty-free sources, or official streaming embeds. Never hardcode copyrighted MP3s.

### Cover Images

- Drop square images (at least 400×400px) into `public/images/covers/`
- Reference them as `/images/covers/filename.png` in `coverUrl`
- Remote URLs (e.g. Spotify CDN) also work — they're already whitelisted in `next.config.ts`

---

## 🔗 Updating Playlist Links

In **`src/data/playlist.ts`**, update the constants at the top:

```ts
export const SPOTIFY_PLAYLIST_URL =
  "https://open.spotify.com/playlist/YOUR_REAL_PLAYLIST_ID";

export const YT_MUSIC_PLAYLIST_URL =
  "https://music.youtube.com/playlist?list=YOUR_REAL_PLAYLIST_ID";
```

---

## 🚀 Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "🚌 Bus Stop"
git remote add origin https://github.com/YOUR_USER/bus-stop.git
git push -u origin main

# 2. Import in Vercel
# Go to https://vercel.com/new → Import your repo → Deploy
# Framework: Next.js (auto-detected)
# No env vars needed for the default setup
```

### OG Image

Replace `public/og-image.png` with a 1200×630px image for social sharing previews.

---

## 🛠 Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 🎨 Retinting the Palette

All colors are CSS variables in **`src/app/globals.css`** under `:root {}`. Change them to completely retint the theme:

```css
:root {
  --clr-bg:          #1a1208;   /* page background */
  --clr-sun:         #e8c060;   /* sun-bleached yellow */
  --clr-amber:       #c8832a;   /* primary accent */
  --clr-rust:        #b04a1a;   /* secondary accent */
  --clr-green-faded: #4a6a3a;   /* bus livery green */
  /* ... etc. */
}
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx        ← Root layout, fonts, meta tags
│   ├── page.tsx          ← Home page (renders Player)
│   └── globals.css       ← All styles + CSS variables
├── components/
│   ├── Player.tsx        ← Main assembled player
│   ├── Header.tsx        ← Site tag + Spotify/YT links
│   ├── CassetteArt.tsx   ← Cover image + spool animation
│   ├── TrackInfo.tsx     ← Title, artist, album
│   └── Controls.tsx      ← Seek bar + transport buttons
├── data/
│   └── playlist.ts       ← ⭐ Edit this to add tracks
├── hooks/
│   └── usePlayer.ts      ← All audio playback logic
└── types/
    └── playlist.ts       ← Track type definition
public/
└── images/
    └── covers/           ← Drop cover images here
```

---

*Made with ☕ and the distinct feeling of sitting in the last row, window side, watching India go by.*
