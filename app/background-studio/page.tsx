import type { Metadata } from "next";
import BackgroundStudio from "./BackgroundStudio";

export const metadata: Metadata = {
  title: "Background Studio | Praxys UI",
  description:
    "Preview and tune animated background effects in one place, then copy a clean starting point for your UI.",
  openGraph: {
    title: "Background Studio | Praxys UI",
    description:
      "Preview and tune animated background effects in one place, then copy a clean starting point for your UI.",
  },
};

export default function BackgroundStudioPage() {
  return <BackgroundStudio />;
}

