import type { Metadata } from "next";
import TemplatesContent from "./TemplatesContent";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Pre-built page templates combining multiple Praxys UI components into production-ready layouts. Copy the full source and customize.",
};

export default function TemplatesPage() {
  return <TemplatesContent />;
}
