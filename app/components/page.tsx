import type { Metadata } from "next";
import { COMPONENT_COUNT_LABEL } from "@/lib/site-stats";
import ComponentsPageContent from "./ComponentsPageContent";

export const metadata: Metadata = {
  title: "Components | Praxys UI",
  description:
    `Browse ${COMPONENT_COUNT_LABEL} animated React components with live demos. Buttons, cards, text effects, navigation, visual effects, and more.`,
};

export default function ComponentsPage() {
  return <ComponentsPageContent />;
}
