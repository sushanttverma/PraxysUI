import type { MetadataRoute } from "next";
import { allSlugs } from "@/lib/registry";
import { allTemplateSlugs } from "@/lib/templates";

const BASE_URL = "https://ui.praxys.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const docPages = allSlugs
    .filter((s) => s !== "introduction")
    .map((slug) => ({
      url: `${BASE_URL}/docs/${slug}`,
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
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
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
    ...docPages,
    ...templatePages,
  ];
}
