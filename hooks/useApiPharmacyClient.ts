"use client";
import { useContext } from "react";
import { PharmacyContext } from "@/context/PharmacyProvider";

export function useApiClient<T>() {
  const { pharmacyDetails, lang } = useContext(PharmacyContext)!;

  async function apiFetch(endpoint: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const url = new URL(endpoint, baseUrl);

    // ✅ Attach global params automatically
    url.searchParams.set("lang", lang || "en");
    // url.searchParams.set('country', pharmacyDetails?.data[0].country);
    url.searchParams.set("region", pharmacyDetails?.data[0].region || "");
    url.searchParams.set("city", pharmacyDetails?.data[0].town || "");
    url.searchParams.set("pharmacyId", pharmacyDetails?.data[0].id?.toString() || "");

    const res = await fetch(url.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.statusText}`);
    }

    return await res.json();
  }

  return { apiFetch };
}
