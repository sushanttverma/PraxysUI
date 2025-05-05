import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./components/ThemeProvider";
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
    <html lang="en" className={geistPixel.variable} suppressHydrationWarning>
      <head>
        {/* Inline script to prevent FOUC — reads theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('praxys-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()`,
          }}
        />
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
      <body className="noise-overlay antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
