// ─── Re-export types ─────────────────────────────────────
export type {
  PropDef,
  PlaygroundPropDef,
  PlaygroundConfig,
  ComponentEntry,
  SidebarGroup,
} from "./types";

import type { ComponentEntry, SidebarGroup } from "./types";

// ─── Per-component imports ───────────────────────────────
import animatedButton from "./animated-button";
import flipText from "./flip-text";
import glowBorderCard from "./glow-border-card";
import animatedNumber from "./animated-number";
import lineHoverLink from "./line-hover-link";
import lightLines from "./light-lines";
import creepyButton from "./creepy-button";
import socialFlipButton from "./social-flip-button";
import testimonialsCard from "./testimonials-card";
import staggeredGrid from "./staggered-grid";
import expandableBentoGrid from "./expandable-bento-grid";
import perspectiveGrid from "./perspective-grid";
import flipFadeText from "./flip-fade-text";
import displacementText from "./displacement-text";
import spotlightNavbar from "./spotlight-navbar";
import glassDock from "./glass-dock";
import liquidOcean from "./liquid-ocean";
import liquidMetal from "./liquid-metal";
import revealLoader from "./reveal-loader";
import animatedHero from "./animated-hero";
import maskedAvatars from "./masked-avatars";
import folderPreview from "./folder-preview";
import interactiveBook from "./interactive-book";
import logoSlider from "./logo-slider";
import typewriterText from "./typewriter-text";
import toastNotification from "./toast-notification";
import accordion from "./accordion";
import animatedTabs from "./animated-tabs";
import magneticCursor from "./magnetic-cursor";
import parallaxScroll from "./parallax-scroll";
import gradientMesh from "./gradient-mesh";
import skeletonLoader from "./skeleton-loader";
import morphingText from "./morphing-text";
import spotlightCard from "./spotlight-card";
import modalDialog from "./modal-dialog";
import tooltip from "./tooltip";
import dropdownMenu from "./dropdown-menu";
import progressBar from "./progress-bar";
import stepper from "./stepper";
import imageComparison from "./image-comparison";
import animatedCounter from "./animated-counter";
import infiniteScroll from "./infinite-scroll";
import commandMenu from "./command-menu";
import animatedToggle from "./animated-toggle";
import badge from "./badge";
import avatarGroup from "./avatar-group";
import breadcrumbs from "./breadcrumbs";
import tagInput from "./tag-input";
import kbd from "./kbd";
import dataTable from "./data-table";

// ─── Sidebar structure ───────────────────────────────────

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "Getting Started",
    items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "installation", title: "Install Next.js" },
      { slug: "install-tailwind", title: "Install Tailwind CSS" },
      { slug: "add-utilities", title: "Add Utilities" },
      { slug: "cli", title: "CLI" },
    ],
  },
  {
    title: "Components",
    items: [
      { slug: "components-overview", title: "Overview" },
      { slug: "animated-button", title: "Animated Button" },
      { slug: "flip-text", title: "Flip Text" },
      { slug: "glow-border-card", title: "Glow Border Card" },
      { slug: "animated-number", title: "Animated Number" },
      { slug: "line-hover-link", title: "Line Hover Link" },
      { slug: "light-lines", title: "Light Lines" },
      { slug: "creepy-button", title: "Creepy Button" },
      { slug: "social-flip-button", title: "Social Flip Button" },
      { slug: "testimonials-card", title: "Testimonials Card" },
      { slug: "staggered-grid", title: "Staggered Grid" },
      { slug: "expandable-bento-grid", title: "Expandable Bento Grid" },
      { slug: "perspective-grid", title: "Perspective Grid" },
      { slug: "flip-fade-text", title: "Flip Fade Text" },
      { slug: "displacement-text", title: "3D Displacement Text" },
      { slug: "spotlight-navbar", title: "Spotlight Navbar" },
      { slug: "glass-dock", title: "Glass Dock" },
      { slug: "liquid-ocean", title: "Liquid Ocean" },
      { slug: "liquid-metal", title: "Liquid Metal" },
      { slug: "animated-hero", title: "Animated Hero" },
      { slug: "masked-avatars", title: "Masked Avatars" },
      { slug: "folder-preview", title: "Folder Preview" },
      { slug: "interactive-book", title: "Interactive Book" },
      { slug: "reveal-loader", title: "Reveal Loader" },
      { slug: "logo-slider", title: "Logo Slider" },
      { slug: "typewriter-text", title: "Typewriter Text" },
      { slug: "toast-notification", title: "Toast Notification" },
      { slug: "accordion", title: "Accordion" },
      { slug: "animated-tabs", title: "Animated Tabs" },
      { slug: "magnetic-cursor", title: "Magnetic Cursor" },
      { slug: "parallax-scroll", title: "Parallax Scroll" },
      { slug: "gradient-mesh", title: "Gradient Mesh" },
      { slug: "skeleton-loader", title: "Skeleton Loader" },
      { slug: "morphing-text", title: "Morphing Text" },
      { slug: "spotlight-card", title: "Spotlight Card" },
      { slug: "modal-dialog", title: "Modal Dialog" },
      { slug: "tooltip", title: "Tooltip" },
      { slug: "dropdown-menu", title: "Dropdown Menu" },
      { slug: "progress-bar", title: "Progress Bar" },
      { slug: "stepper", title: "Stepper" },
      { slug: "image-comparison", title: "Image Comparison" },
      { slug: "animated-counter", title: "Animated Counter" },
      { slug: "infinite-scroll", title: "Infinite Scroll" },
      { slug: "command-menu", title: "Command Menu" },
      { slug: "animated-toggle", title: "Animated Toggle" },
      { slug: "badge", title: "Badge" },
      { slug: "tag-input", title: "Tag Input" },
      { slug: "avatar-group", title: "Avatar Group" },
      { slug: "breadcrumbs", title: "Breadcrumbs" },
      { slug: "kbd", title: "Kbd" },
      { slug: "data-table", title: "Data Table" },
    ],
  },
];

// ─── All slugs in order (for prev/next navigation) ──────

export const allSlugs: string[] = sidebarGroups.flatMap((g) =>
  g.items.map((i) => i.slug)
);

export function getPrevNext(slug: string) {
  const idx = allSlugs.indexOf(slug);
  return {
    prev: idx > 0 ? allSlugs[idx - 1] : null,
    next: idx < allSlugs.length - 1 ? allSlugs[idx + 1] : null,
  };
}

export function getTitle(slug: string): string {
  for (const group of sidebarGroups) {
    const item = group.items.find((i) => i.slug === slug);
    if (item) return item.title;
  }
  return slug;
}

// ─── Component registry ──────────────────────────────────

export const componentRegistry: Record<string, ComponentEntry> = {
  "animated-button": animatedButton,
  "flip-text": flipText,
  "glow-border-card": glowBorderCard,
  "animated-number": animatedNumber,
  "line-hover-link": lineHoverLink,
  "light-lines": lightLines,
  "creepy-button": creepyButton,
  "social-flip-button": socialFlipButton,
  "testimonials-card": testimonialsCard,
  "staggered-grid": staggeredGrid,
  "expandable-bento-grid": expandableBentoGrid,
  "perspective-grid": perspectiveGrid,
  "flip-fade-text": flipFadeText,
  "displacement-text": displacementText,
  "spotlight-navbar": spotlightNavbar,
  "glass-dock": glassDock,
  "liquid-ocean": liquidOcean,
  "liquid-metal": liquidMetal,
  "reveal-loader": revealLoader,
  "animated-hero": animatedHero,
  "masked-avatars": maskedAvatars,
  "folder-preview": folderPreview,
  "interactive-book": interactiveBook,
  "logo-slider": logoSlider,
  "typewriter-text": typewriterText,
  "toast-notification": toastNotification,
  "accordion": accordion,
  "animated-tabs": animatedTabs,
  "magnetic-cursor": magneticCursor,
  "parallax-scroll": parallaxScroll,
  "gradient-mesh": gradientMesh,
  "skeleton-loader": skeletonLoader,
  "morphing-text": morphingText,
  "spotlight-card": spotlightCard,
  "modal-dialog": modalDialog,
  "tooltip": tooltip,
  "dropdown-menu": dropdownMenu,
  "progress-bar": progressBar,
  "stepper": stepper,
  "image-comparison": imageComparison,
  "animated-counter": animatedCounter,
  "infinite-scroll": infiniteScroll,
  "command-menu": commandMenu,
  "animated-toggle": animatedToggle,
  "badge": badge,
  "avatar-group": avatarGroup,
  "breadcrumbs": breadcrumbs,
  "tag-input": tagInput,
  "kbd": kbd,
  "data-table": dataTable,
};

// Helper: check if a slug is a component page
export function isComponentSlug(slug: string): boolean {
  return slug in componentRegistry;
}

// Helper: get all component entries as array
export function getAllComponents(): ComponentEntry[] {
  return Object.values(componentRegistry);
}
