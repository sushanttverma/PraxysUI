import type { Metadata } from "next";
import ComponentsPageContent from "./ComponentsPageContent";

export const metadata: Metadata = {
  title: "Components | Praxys UI",
  description:
    "Browse 70+ animated React components with live demos. Buttons, cards, text effects, navigation, visual effects, and more.",
};

export default function ComponentsPage() {
  return <ComponentsPageContent />;
}
