"use client";
import { useContext, useEffect, useState } from "react";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { getUserDetails } from "@/utils/getUserDetails";




export function useApiClient<T>() {
  const [data, setData] = useState();

  useEffect(( ) => {
    const data = getUserDetails()
    setData(data)
  },[])
  const pharmacyContext = useContext(PharmacyContext);



  async function apiFetch(endpoint: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const url = new URL(endpoint, baseUrl);

    // ✅ Attach global params automatically
    url.searchParams.set("lang", pharmacyContext?.lang || "en");
    // url.searchParams.set('country', pharmacyDetails?.data[0].country);
    url.searchParams.set("region", data.region || "");
    url.searchParams.set("city", data.town || "");
    url.searchParams.set("pharmacyId", data.id?.toString() || '');

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
