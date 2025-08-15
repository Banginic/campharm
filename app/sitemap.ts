import type { MetadataRoute } from "next";
import { db } from "@/drizzle/index";
import { pharmacyTable, drugTable } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { CAMEROON } from "@/assets/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://localhost:3000";

  // 1️⃣ Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "/blogs",
    "/help",
    "/pharmacies",
    "/updates",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  // 2️⃣ Dynamic pharmacy pages
  const pharmacies = await db
    .select({
      id: pharmacyTable.id,
      updatedAt: pharmacyTable.createdAt,
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
      updatedAt: drugTable.createdAt,
    })
    .from(drugTable)
    .orderBy(desc(drugTable.createdAt));

  const drugRoutes: MetadataRoute.Sitemap = drugs.map((drug) => ({
    url: `${baseUrl}/drug/${drug.id}`,
    lastModified: drug.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 4️⃣ Region/Town pages (user-facing)
  const regionTownRoutes: MetadataRoute.Sitemap = CAMEROON.flatMap(({ region, towns }) =>
    towns.map((town) => ({
      url: `${baseUrl}/pharmacies/lang/en/region/${encodeURIComponent(region)}/city/${encodeURIComponent(town)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    }))
  );

  // 5️⃣ Combine all routes
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...staticRoutes,
    ...pharmacyRoutes,
    ...drugRoutes,
    ...regionTownRoutes,
  ];
}
