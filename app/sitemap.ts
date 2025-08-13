import type { MetadataRoute } from "next";
import { db } from "@/drizzle/index";
import { pharmacyTable, drugTable } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://medyro.vercel.app";

  // 1️⃣ Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blogs",
    "/help",
    "/pharmacies",
    "/updates",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 2️⃣ Dynamic pharmacy pages
  const pharmacies = await db
    .select({
      id: pharmacyTable.id,
      updatedAt: pharmacyTable.createdAt, // If you have updatedAt, use that
    })
    .from(pharmacyTable)
    .orderBy(desc(pharmacyTable.createdAt));

  const pharmacyRoutes: MetadataRoute.Sitemap = pharmacies.map((ph) => ({
    url: `${baseUrl}/pharmacy/${ph.id}`,
    lastModified: ph.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 3️⃣ Dynamic drug pages
  const drugs = await db
    .select({
      id: drugTable.id,
      updatedAt: drugTable.createdAt, // If you have updatedAt, use that
    })
    .from(drugTable)
    .orderBy(desc(drugTable.createdAt));

  const drugRoutes: MetadataRoute.Sitemap = drugs.map((drug) => ({
    url: `${baseUrl}/drug/${drug.id}`,
    lastModified: drug.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Combine all
  return [...staticRoutes, ...pharmacyRoutes, ...drugRoutes];
}
