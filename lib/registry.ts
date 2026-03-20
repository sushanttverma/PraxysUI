// Re-export everything from the modular registry
// All imports like `from '@/lib/registry'` continue to work unchanged.
export {
  sidebarGroups,
  allSlugs,
  getPrevNext,
  getTitle,
  componentRegistry,
  componentCount,
  isComponentSlug,
  getAllComponents,
  backgroundSlugs,
} from "./registry/index";

export type {
  PropDef,
  PlaygroundPropDef,
  PlaygroundConfig,
  ComponentEntry,
  SidebarGroup,
} from "./registry/types";
