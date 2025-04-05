import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistPixel = localFont({
  src: "./fonts/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Praxys UI - Premium React Components",
  description:
    "A curated collection of beautifully crafted, animated React components. Build stunning interfaces with precision and speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistPixel.variable}>
      <head>
        {/* Satoshi — body font */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        {/* JetBrains Mono — technical/code font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay antialiased">
        {children}
      </body>
    </html>
  );
}
