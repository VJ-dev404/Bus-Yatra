// 1. Social Links 
export const SPOTIFY_PLAYLIST_URL = "https://spotify.com/"; 
export const YT_MUSIC_PLAYLIST_URL = "https://music.youtube.com/"; 

// 2. Your Supabase Base URL
const BASE_URL = "https://dcffxmrdumfechloerme.supabase.co/storage/v1/object/public/Audio%20Files";

// 3. The Playlist Data (Now with IDs!)
export const playlist = [
  {
    id: "1", // <-- ADDED THIS
    title: "Main Agar Saamne",
    artist: "Abhijeet & Alka Yagnik",
    audioUrl: `${BASE_URL}/Main%20Agar%20Saamne.mp3.mpeg`, 
    coverUrl: "/bg-mobile.png", 
  },
  {
    id: "2", // <-- ADDED THIS
    title: "Aisi Deewangi",
    artist: "Vinod Rathod & Alka Yagnik",
    audioUrl: `${BASE_URL}/Aisi%20Deewangi.mp3.mpeg`, 
    coverUrl: "/bg-mobile.png",
  },
  {
    id: "3", // <-- ADDED THIS
    title: "Ye Kaali Kaali Aankhen",
    artist: "Kumar Sanu & Anu Malik",
    audioUrl: `${BASE_URL}/Ye%20Kaali%20Kaali%20Aankhen.mp3.mpeg`, 
    coverUrl: "/bg-mobile.png",
  },
  {
    id: "4", // <-- ADDED THIS
    title: "Jeeta Tha Jiske Liye",
    artist: "Kumar Sanu & Alka Yagnik",
    audioUrl: `${BASE_URL}/Jeeta%20Tha%20Jiske%20Liye.mp3.mpeg`, 
    coverUrl: "/bg-mobile.png",
  },
  {
    id: "5", // <-- ADDED THIS
    title: "Mera Dil Bhi Kitna Pagal Hai",
    artist: "Kumar Sanu & Alka Yagnik",
    audioUrl: `${BASE_URL}/Mera%20Dil%20Bhi%20Kitna%20Pagal%20Hai.mp3.mpeg`, 
    coverUrl: "/bg-mobile.png",
  },
  {
    id: "6", // <-- ADDED THIS
    title: "Ek Sanam Chahiye",
    artist: "Kumar Sanu",
    audioUrl: `${BASE_URL}/Ek%20Sanam%20Chahiye%20Aashiqui%20Ke%20Liye%20(From%20_Aashiqui).mp3.mpeg`, 
    coverUrl: "/bg-mobile.png",
  }
];