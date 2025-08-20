import { db } from "@/drizzle/index";
import { pharmacyTable, drugTable } from "@/drizzle/schema";
import { CAMEROON } from "@/assets/data";
import { desc } from "drizzle-orm";

function generateSitemapXml(urls: { url: string; lastModified: Date }[]) {
  const xmlUrls = urls
    .map(
      ({ url, lastModified }) =>
        `<url><loc>${url}</loc><lastmod>${lastModified.toISOString()}</lastmod></url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export default async function sitemap() {
  const baseUrl = "https://medyro.vercel.app";

  const staticRoutes = ["/blogs", "/help", "/pharmacies", "/updates"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const pharmacies = await db
    .select({
      id: pharmacyTable.id,
      updatedAt: pharmacyTable.createdAt,
    })
    .from(pharmacyTable)
    .orderBy(desc(pharmacyTable.createdAt));

  const pharmacyRoutes = pharmacies.map((ph) => ({
    url: `${baseUrl}/pharmacy/${ph.id}`,
    lastModified: ph.updatedAt || new Date(),
  }));

  const drugs = await db
    .select({
      id: drugTable.id,
      updatedAt: drugTable.createdAt,
    })
    .from(drugTable)
    .orderBy(desc(drugTable.createdAt));

  const drugRoutes = drugs.map((drug) => ({
    url: `${baseUrl}/drug/${drug.id}`,
    lastModified: drug.updatedAt || new Date(),
  }));

  const regionTownRoutes = CAMEROON.flatMap(({ region, towns }) =>
    towns.map((town) => ({
      url: `${baseUrl}/pharmacies/lang/en/region/${encodeURIComponent(region)}/city/${encodeURIComponent(town)}`,
      lastModified: new Date(),
    }))
  );

  const allRoutes = [
    { url: baseUrl, lastModified: new Date() },
    ...staticRoutes,
    ...pharmacyRoutes,
    ...drugRoutes,
    ...regionTownRoutes,
  ];

  return new Response(generateSitemapXml(allRoutes), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
