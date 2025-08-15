import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/pages/AppLayout";
import { rootLayoutKeywords } from "@/constants/keywords";
import { MY_DATA } from "@/assets/data";

export const metadata: Metadata = {
  title: "Medyro | Find Nearby Pharmacies & Medications Worldwide",
  description:
    "Medyro helps you find the nearest pharmacy near you, search and purchase medications locally, and enables pharmacy owners to manage schedules, inventory, and on-call services.",
  keywords: rootLayoutKeywords,
  authors: [{ name: "Banginic", url: MY_DATA.appUrl || "https://medyro.vercel.app" }],
  creator: "Banginic",
  publisher: "Banginic",
  metadataBase: new URL(MY_DATA.appUrl || "https://medyro.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: MY_DATA.appUrl || "https://medyro.vercel.app",
    siteName: "Medyro",
    title: "Medyro | Find nearby pharmacies & medications ",
    description:
      "Discover nearby pharmacies, search for available medicines, and manage your pharmacy business with Medyro’s powerful global platform.",
    images: [
      {
        url: "https://medyro.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Medyro - Find nearby pharmacies & medications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@medyro",
    creator: "@medyro",
    title: "Medyro | Find Nearby Pharmacies & Medications Worldwide",
    description:
      "Search for pharmacies nearby, buy medication locally, and manage your pharmacy with Medyro’s global directory & tools.",
    images: ["https://medyro.vercel.app/opengraph-image.png"],
  },
  alternates: {
    canonical: MY_DATA.appUrl || "https://medyro.vercel.app",
    languages: {
      "en-US": MY_DATA.appUrl || "https://medyro.vercel.app",
      "fr-FR": "https://medyro.vercel.app/fr",
    },
  },
  category: "Health & Medicine",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  applicationName: "Medyro",
  manifest: "/site.webmanifest",
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0D6EFD" />
        <meta name="google-site-verification" content="5M61_D2oFK-LEPEBEv-eb196Y4xZK3A3ZmI13gE2qiE" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-gradient-to-br from-pink-200/20 via-purple-200/20 to-green-200/70`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
