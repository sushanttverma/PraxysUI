import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const geistPixel = localFont({
  src: "./fonts/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel",
  weight: "500",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://ui.praxys.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Praxys UI - Animated React Components",
    template: "%s | Praxys UI",
  },
  description:
    "A curated collection of 69 beautifully crafted, animated React components. Browse, copy, paste, and ship.",
  keywords: [
    "React",
    "components",
    "UI library",
    "Tailwind CSS",
    "Framer Motion",
    "animated components",
    "Next.js",
    "TypeScript",
    "open source",
  ],
  authors: [{ name: "Sushant Verma", url: "https://github.com/sushanttverma" }],
  creator: "Sushant Verma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Praxys UI",
    title: "Praxys UI - Animated React Components",
    description:
      "A curated collection of 69 beautifully crafted, animated React components. Browse, copy, paste, and ship.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Praxys UI - Animated React Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praxys UI - Animated React Components",
    description:
      "A curated collection of 69 beautifully crafted, animated React components. Browse, copy, paste, and ship.",
    images: [`${SITE_URL}/opengraph-image`],
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
      className={`${geistPixel.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to prevent FOUC — reads theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('praxys-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()`,
          }}
        />
        {/* Satoshi — body font (Fontshare CDN) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        {/* JetBrains Mono is loaded via next/font/google — no external <link> needed */}
      </head>
      <body className="noise-overlay antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
