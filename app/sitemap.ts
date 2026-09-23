import type { MetadataRoute } from "next";
import { createSitemap } from "@/lib/sitemap-data.mjs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com";
  return createSitemap(baseUrl) as MetadataRoute.Sitemap;
}
