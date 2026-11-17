import { Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

// Switzer - sans-serif principale (auto-hébergée, Fontshare)
const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  src: [
    { path: "../public/fonts/switzer/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/switzer/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/switzer/switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/switzer/switzer-700.woff2", weight: "700", style: "normal" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

/** Font CSS variables, applied on <html> by every root layout. */
export const fontVariables = `${switzer.variable} ${geistMono.variable} ${instrumentSerif.variable}`;
