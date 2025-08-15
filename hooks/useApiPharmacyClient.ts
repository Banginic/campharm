"use client"; // important! ensures this hook runs in the browser

import { useContext } from "react";
import { PharmacyContext } from "@/context/PharmacyProvider";

export function useApiClient<T>() {
  const pharmacyContext = useContext(PharmacyContext);

  if (!pharmacyContext) {
    throw new Error("useApiClient must be used within PharmacyProvider");
  }

  async function apiFetch(endpoint: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    const url = new URL(endpoint, baseUrl);

    // ✅ Attach global params automatically
    url.searchParams.set("lang", pharmacyContext?.lang || "en");
    url.searchParams.set("region", pharmacyContext?.pharmacyDetails?.region || "");
    url.searchParams.set("city", pharmacyContext?.pharmacyDetails?.town || "");
    url.searchParams.set("pharmacyId", pharmacyContext?.pharmacyDetails?.id?.toString() || "");

    const res = await fetch(url.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });


    return await res.json();
  }

  return { apiFetch };
}
