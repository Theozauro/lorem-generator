import type { MetadataRoute } from "next";
import { createSitemap } from "@/lib/sitemap-data.mjs";

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap() as MetadataRoute.Sitemap;
}
