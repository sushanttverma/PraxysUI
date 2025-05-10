import type { Metadata } from "next";
import ChangelogContent from "./ChangelogContent";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "See what's new in Praxys UI. A complete history of features, fixes, and improvements.",
};

export default function ChangelogPage() {
  return <ChangelogContent />;
}
