import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bus-stop.vercel.app"),
  title: "Bus Yatra/Travel - बस यात्रा",
  description:
    "Nostalgia on repeat. The songs that blasted from cassette decks on Indian state buses — driver's collection, conductor's whistle, last seat by the window.",
  keywords: [
    "Bollywood",
    "90s",
    "Hindi songs",
    "nostalgia",
    "cassette",
    "Indian bus",
    "retro music",
  ],
  authors: [{ name: "Bus Yatra" }],
  openGraph: {
    title: "Bus Yatra/Travel - बस यात्रा",
    description:
      "Nostalgia on repeat. The songs that blasted from cassette decks on Indian state buses.",
    url: "https://bus-stop.vercel.app",
    siteName: "Bus Yatra",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bus Yatra/Travel - बस यात्रा",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bus Yatra/Travel - बस यात्रा",
    description:
      "Nostalgia on repeat. The songs that blasted from cassette decks on Indian state buses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        /* Overriding the previous Google font variables with Arial */
        "--font-display": "Arial, Helvetica, sans-serif",
        "--font-body": "Arial, Helvetica, sans-serif",
        "--font-mono": "Arial, Helvetica, sans-serif",
      } as React.CSSProperties}
    >
      <body style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}