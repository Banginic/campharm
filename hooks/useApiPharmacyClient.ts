"use client";

import { useContext, useEffect } from "react";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useApiClient<T>() {
  const pharmacyContext = useContext(PharmacyContext);
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/pharmacy/login");
    }
  }, [status, router]);

  if (!pharmacyContext) {
    throw new Error("useApiClient must be used within PharmacyProvider");
  }

  async function apiFetch(endpoint: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    const url = new URL(endpoint, baseUrl);

    // ✅ Attach global params automatically
    url.searchParams.set("lang", pharmacyContext?.lang || "en");

    if (data?.user?.region) url.searchParams.set("region", data.user.region);
    if (data?.user?.town) url.searchParams.set("city", data.user.town);
    if (data?.user?.id) url.searchParams.set("pharmacyId", data.user.id.toString());

    const res = await fetch(url.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return res.json();
  }

  return { apiFetch };
}
