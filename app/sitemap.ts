import type { MetadataRoute } from "next";
import { db } from "@/drizzle/index";
import { pharmacyTable, drugTable } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { CAMEROON } from "@/assets/data"; // [{ region: "littoral", towns: ["douala", ...] }, ...]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://medyro.vercel.app";
 
  function escapeUrl (url: string){
    return url.replace(/&/g, "&amp;")
  }
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
      updatedAt: pharmacyTable.createdAt, // replace with updatedAt if available
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
      updatedAt: drugTable.createdAt, // replace with updatedAt if available
    })
    .from(drugTable)
    .orderBy(desc(drugTable.createdAt));

  const drugRoutes: MetadataRoute.Sitemap = drugs.map((drug) => ({
    url: `${baseUrl}/drug/${drug.id}`,
    lastModified: drug.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 4️⃣ Region/Town pharmacy listing pages (from CAMEROON array)
  const regionTownRoutes: MetadataRoute.Sitemap = CAMEROON.flatMap(({ region, towns }) =>
    towns.map((town) => ({
      url: escapeUrl(`${baseUrl}/api/pharmacy/list-town-pharmacies?lang=en&region=${encodeURIComponent(region)}&town=${encodeURIComponent(town)}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.2,
    }))
  );

  // 5️⃣ Combine all routes
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1
    },
    ...staticRoutes,
    ...pharmacyRoutes,
    ...drugRoutes,
    ...regionTownRoutes,
  ];
}
