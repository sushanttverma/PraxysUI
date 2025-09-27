import type { MetadataRoute } from "next";
import { componentRegistry } from "@/lib/registry";
import { allTemplateSlugs } from "@/lib/templates";

const BASE_URL = "https://ui.praxys.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const componentPages = Object.keys(componentRegistry).map((slug) => ({
    url: `${BASE_URL}/components/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const templatePages = allTemplateSlugs.map((slug) => ({
    url: `${BASE_URL}/templates/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/components`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/components/install`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/changelog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/customize`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/examples`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...componentPages,
    ...templatePages,
  ];
}
