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
import fallingText from "./falling-text";
import splitText from "./split-text";
import blurText from "./blur-text";
import shinyText from "./shiny-text";
import fuzzyText from "./fuzzy-text";
import scrollReveal from "./scroll-reveal";
import variableProximity from "./variable-proximity";
import displacementText from "./displacement-text";
import spotlightNavbar from "./spotlight-navbar";
import glassDock from "./glass-dock";
import liquidOcean from "./liquid-ocean";
import liquidMetal from "./liquid-metal";
import revealLoader from "./reveal-loader";
import animatedHero from "./animated-hero";
import maskedAvatars from "./masked-avatars";
import folder from "./folder";
import folderPreview from "./folder-preview";
import interactiveBook from "./interactive-book";
import logoSlider from "./logo-slider";
import typewriterText from "./typewriter-text";
import circularText from "./circular-text";
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
import animatedInput from "./animated-input";
import animatedSelect from "./animated-select";
import animatedTextarea from "./animated-textarea";
import checkbox from "./checkbox";
import radioGroup from "./radio-group";
import alert from "./alert";
import pagination from "./pagination";
import sheet from "./sheet";
import divider from "./divider";
import timeline from "./timeline";
import statsCard from "./stats-card";
import datePicker from "./date-picker";
import combobox from "./combobox";
import colorPicker from "./color-picker";
import switchComponent from "./switch";
import slider from "./slider";
import fileUpload from "./file-upload";
import otpInput from "./otp-input";
import rating from "./rating";
import autocomplete from "./autocomplete";
import floatingMenu from "./floating-menu";
import gradientText from "./gradient-text";
import scrambleText from "./scramble-text";
import textReveal from "./text-reveal";
import glitchText from "./glitch-text";
import pricingCard from "./pricing-card";
import profileCard from "./profile-card";
import featureCard from "./feature-card";
import comparisonTable from "./comparison-table";
import statBar from "./stat-bar";
import confetti from "./confetti";
import particles from "./particles";
import noiseTexture from "./noise-texture";
import aurora from "./aurora";
import blurFade from "./blur-fade";
import carousel from "./carousel";
import avatar from "./avatar";
import lightbox from "./lightbox";
import sidebar from "./sidebar";
import bottomSheet from "./bottom-sheet";
import popover from "./popover";
import contextMenu from "./context-menu";
import megaMenu from "./mega-menu";
import toggleGroup from "./toggle-group";
import numberInput from "./number-input";
import searchInput from "./search-input";
import passwordInput from "./password-input";
import rangeSlider from "./range-slider";
import copyButton from "./copy-button";
import mentionInput from "./mention-input";
import scrollProgress from "./scroll-progress";
import scrollDna from "./scroll-dna";
import scrollStack from "./scroll-stack";
import circularGallery from "./circular-gallery";
import masonry from "./masonry";
import magicBento from "./magic-bento";
import chromaGrid from "./chroma-grid";
import pixelTransition from "./pixel-transition";
import silk from "./silk";
import orb from "./orb";
import liquidChrome from "./liquid-chrome";
import balatro from "./balatro";
import dither from "./dither";
import dotGrid from "./dot-grid";
import beams from "./beams";
import darkVeil from "./dark-veil";
import lightRays from "./light-rays";
import prism from "./prism";
import gradientBlinds from "./gradient-blinds";
import grainient from "./grainient";
import pixelBlast from "./pixel-blast";
import liquidEther from "./liquid-ether";
import colorBends from "./color-bends";
import lightPillar from "./light-pillar";
import antigravity from "./antigravity";
import clickSpark from "./click-spark";
import laserFlow from "./laser-flow";
import ribbons from "./ribbons";
import splashCursor from "./splash-cursor";

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
      { slug: "falling-text", title: "Falling Text" },
      { slug: "split-text", title: "Split Text" },
      { slug: "blur-text", title: "Blur Text" },
      { slug: "shiny-text", title: "Shiny Text" },
      { slug: "fuzzy-text", title: "Fuzzy Text" },
      { slug: "scroll-reveal", title: "Scroll Reveal" },
      { slug: "variable-proximity", title: "Variable Proximity" },
      { slug: "displacement-text", title: "3D Displacement Text" },
      { slug: "spotlight-navbar", title: "Spotlight Navbar" },
      { slug: "glass-dock", title: "Glass Dock" },
      { slug: "liquid-ocean", title: "Liquid Ocean" },
      { slug: "liquid-metal", title: "Liquid Metal" },
      { slug: "animated-hero", title: "Animated Hero" },
      { slug: "masked-avatars", title: "Masked Avatars" },
      { slug: "folder", title: "Folder" },
      { slug: "folder-preview", title: "Folder Preview" },
      { slug: "interactive-book", title: "Interactive Book" },
      { slug: "reveal-loader", title: "Reveal Loader" },
      { slug: "logo-slider", title: "Logo Slider" },
      { slug: "typewriter-text", title: "Typewriter Text" },
      { slug: "circular-text", title: "Circular Text" },
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
      { slug: "animated-input", title: "Animated Input" },
      { slug: "animated-select", title: "Animated Select" },
      { slug: "animated-textarea", title: "Animated Textarea" },
      { slug: "checkbox", title: "Checkbox" },
      { slug: "radio-group", title: "Radio Group" },
      { slug: "alert", title: "Alert" },
      { slug: "pagination", title: "Pagination" },
      { slug: "sheet", title: "Sheet" },
      { slug: "divider", title: "Divider" },
      { slug: "timeline", title: "Timeline" },
      { slug: "stats-card", title: "Stats Card" },
      { slug: "date-picker", title: "Date Picker" },
      { slug: "combobox", title: "Combobox" },
      { slug: "color-picker", title: "Color Picker" },
      { slug: "switch", title: "Switch" },
      { slug: "slider", title: "Slider" },
      { slug: "file-upload", title: "File Upload" },
      { slug: "otp-input", title: "OTP Input" },
      { slug: "rating", title: "Rating" },
      { slug: "autocomplete", title: "Autocomplete" },
      { slug: "floating-menu", title: "Floating Menu" },
      { slug: "gradient-text", title: "Gradient Text" },
      { slug: "scramble-text", title: "Scramble Text" },
      { slug: "text-reveal", title: "Text Reveal" },
      { slug: "glitch-text", title: "Glitch Text" },
      { slug: "pricing-card", title: "Pricing Card" },
      { slug: "profile-card", title: "Profile Card" },
      { slug: "feature-card", title: "Feature Card" },
      { slug: "comparison-table", title: "Comparison Table" },
      { slug: "stat-bar", title: "Stat Bar" },
      { slug: "confetti", title: "Confetti" },
      { slug: "particles", title: "Particles" },
      { slug: "noise-texture", title: "Noise Texture" },
      { slug: "aurora", title: "Aurora" },
      { slug: "blur-fade", title: "Blur Fade" },
      { slug: "carousel", title: "Carousel" },
      { slug: "avatar", title: "Avatar" },
      { slug: "lightbox", title: "Lightbox" },
      { slug: "sidebar", title: "Sidebar" },
      { slug: "bottom-sheet", title: "Bottom Sheet" },
      { slug: "popover", title: "Popover" },
      { slug: "context-menu", title: "Context Menu" },
      { slug: "mega-menu", title: "Mega Menu" },
      { slug: "toggle-group", title: "Toggle Group" },
      { slug: "number-input", title: "Number Input" },
      { slug: "search-input", title: "Search Input" },
      { slug: "password-input", title: "Password Input" },
      { slug: "range-slider", title: "Range Slider" },
      { slug: "copy-button", title: "Copy Button" },
      { slug: "mention-input", title: "Mention Input" },
      { slug: "scroll-progress", title: "Scroll Progress" },
      { slug: "scroll-dna", title: "Scroll DNA" },
      { slug: "scroll-stack", title: "Scroll Stack" },
      { slug: "masonry", title: "Masonry" },
      { slug: "circular-gallery", title: "Circular Gallery" },
      { slug: "magic-bento", title: "Magic Bento" },
      { slug: "chroma-grid", title: "Chroma Grid" },
      { slug: "pixel-transition", title: "Pixel Transition" },
    ],
  },
  {
    title: "Backgrounds",
    items: [
      { slug: "silk", title: "Silk" },
      { slug: "orb", title: "Orb" },
      { slug: "liquid-chrome", title: "Liquid Chrome" },
      { slug: "balatro", title: "Balatro" },
      { slug: "dither", title: "Dither" },
      { slug: "dot-grid", title: "Dot Grid" },
      { slug: "beams", title: "Beams" },
      { slug: "dark-veil", title: "Dark Veil" },
      { slug: "light-rays", title: "Light Rays" },
      { slug: "prism", title: "Prism" },
      { slug: "gradient-blinds", title: "Gradient Blinds" },
      { slug: "grainient", title: "Grainient" },
      { slug: "pixel-blast", title: "Pixel Blast" },
      { slug: "liquid-ether", title: "Liquid Ether" },
      { slug: "color-bends", title: "Color Bends" },
      { slug: "light-pillar", title: "Light Pillar" },
      { slug: "antigravity", title: "Antigravity" },
      { slug: "click-spark", title: "Click Spark" },
      { slug: "laser-flow", title: "Laser Flow" },
      { slug: "ribbons", title: "Ribbons" },
      { slug: "splash-cursor", title: "Splash Cursor" },
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
  "falling-text": fallingText,
  "split-text": splitText,
  "blur-text": blurText,
  "shiny-text": shinyText,
  "fuzzy-text": fuzzyText,
  "scroll-reveal": scrollReveal,
  "variable-proximity": variableProximity,
  "displacement-text": displacementText,
  "spotlight-navbar": spotlightNavbar,
  "glass-dock": glassDock,
  "liquid-ocean": liquidOcean,
  "liquid-metal": liquidMetal,
  "reveal-loader": revealLoader,
  "animated-hero": animatedHero,
  "masked-avatars": maskedAvatars,
  "folder": folder,
  "folder-preview": folderPreview,
  "interactive-book": interactiveBook,
  "logo-slider": logoSlider,
  "typewriter-text": typewriterText,
  "circular-text": circularText,
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
  "animated-input": animatedInput,
  "animated-select": animatedSelect,
  "animated-textarea": animatedTextarea,
  "checkbox": checkbox,
  "radio-group": radioGroup,
  "alert": alert,
  "pagination": pagination,
  "sheet": sheet,
  "divider": divider,
  "timeline": timeline,
  "stats-card": statsCard,
  "date-picker": datePicker,
  "combobox": combobox,
  "color-picker": colorPicker,
  "switch": switchComponent,
  "slider": slider,
  "file-upload": fileUpload,
  "otp-input": otpInput,
  "rating": rating,
  "autocomplete": autocomplete,
  "floating-menu": floatingMenu,
  "gradient-text": gradientText,
  "scramble-text": scrambleText,
  "text-reveal": textReveal,
  "glitch-text": glitchText,
  "pricing-card": pricingCard,
  "profile-card": profileCard,
  "feature-card": featureCard,
  "comparison-table": comparisonTable,
  "stat-bar": statBar,
  "confetti": confetti,
  "particles": particles,
  "noise-texture": noiseTexture,
  "aurora": aurora,
  "blur-fade": blurFade,
  "carousel": carousel,
  "avatar": avatar,
  "lightbox": lightbox,
  "sidebar": sidebar,
  "bottom-sheet": bottomSheet,
  "popover": popover,
  "context-menu": contextMenu,
  "mega-menu": megaMenu,
  "toggle-group": toggleGroup,
  "number-input": numberInput,
  "search-input": searchInput,
  "password-input": passwordInput,
  "range-slider": rangeSlider,
  "copy-button": copyButton,
  "mention-input": mentionInput,
  "scroll-progress": scrollProgress,
  "scroll-dna": scrollDna,
  "scroll-stack": scrollStack,
  "masonry": masonry,
  "circular-gallery": circularGallery,
  "magic-bento": magicBento,
  "chroma-grid": chromaGrid,
  "pixel-transition": pixelTransition,
  "silk": silk,
  "orb": orb,
  "liquid-chrome": liquidChrome,
  "balatro": balatro,
  "dither": dither,
  "dot-grid": dotGrid,
  "beams": beams,
  "dark-veil": darkVeil,
  "light-rays": lightRays,
  "prism": prism,
  "gradient-blinds": gradientBlinds,
  "grainient": grainient,
  "pixel-blast": pixelBlast,
  "liquid-ether": liquidEther,
  "color-bends": colorBends,
  "light-pillar": lightPillar,
  "antigravity": antigravity,
  "click-spark": clickSpark,
  "laser-flow": laserFlow,
  "ribbons": ribbons,
  "splash-cursor": splashCursor,
};

// ─── Background slugs (WebGL – skip SSG) ────────────────
export const backgroundSlugs = new Set([
  "silk", "orb", "liquid-chrome", "balatro", "dither", "dot-grid",
  "beams", "dark-veil", "light-rays", "prism", "gradient-blinds",
  "grainient", "pixel-blast", "liquid-ether", "color-bends",
  "light-pillar", "antigravity", "click-spark", "laser-flow",
  "ribbons", "splash-cursor",
]);

// ─── Single source of truth for component count ─────────
// Import this wherever the count is needed — never hardcode it.
export const componentCount = Object.keys(componentRegistry).length;

// Helper: check if a slug is a component page
export function isComponentSlug(slug: string): boolean {
  return slug in componentRegistry;
}

// Helper: get all component entries as array
export function getAllComponents(): ComponentEntry[] {
  return Object.values(componentRegistry);
}
