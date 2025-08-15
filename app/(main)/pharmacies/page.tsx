import type { Metadata } from "next";
import { PreferedTown, Searchbar, PharmacyGrid } from "@/components/index";
import { pharmacyKeywords } from "@/constants/keywords";

export const metadata: Metadata = {
  title: "Find Pharmacies near you in Cameroon | Medyro",
  description:
    "Discover pharmacies in all regions and towns of Cameroon. Search for nearby pharmacies, view opening hours, and find medications available in your area with Medyro.",
  keywords: pharmacyKeywords,
  openGraph: {
    title: "Find Pharmacies in Cameroon | Medyro",
    description:
      "Search and locate pharmacies in Cameroon by region and town. Get details, opening hours, and available medications instantly.",
    url: "https://medyro.vercel.app/api/pharmacy/list-town-pharmacies?lang=en&region=Littoral&city=Douala",
    siteName: "Medyro",
    type: "website",
    images: [
      {
        url: "https://medyro.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Find pharmacies in Cameroon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find pharmacies in Cameroon | Medyro",
    description:
      "Locate pharmacies by region and town in Cameroon with Medyro. Check availability, hours, and services.",
    images: ["https://medyro.vercel.app/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://medyro.vercel.app/",
  },
};

async  function Pharmacies() {
  return (
    <div className="min-h-screen mb-12">
      <h1 className="font-bold text-xl lg:text-4xl text-center text-green-950 m-8">
        PHARMACIES
      </h1>
      <section className="bg-white shadow-lg p-4 w-[95%] rounded-lg mx-auto max-w-xl">
        <Searchbar />
        <PreferedTown />
      </section>
      <PharmacyGrid />
    </div>
  );
}
export default Pharmacies;
