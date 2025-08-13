import AppContext from "@/context/AppContext";
import { useContext } from "react";

export function useApiClient<T>() {
  
  const pharmacyContext = useContext(AppContext);

  async function apiFetch(endpoint: string, options?: RequestInit): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const url = new URL(endpoint, baseUrl);

    url.searchParams.set("lang", pharmacyContext?.lang || "en");
    // url.searchParams.set('country', preferedTown?.countrry);
    if (pharmacyContext?.preferedTown?.region) {
      url.searchParams.set(
        "region",
        encodeURIComponent(pharmacyContext?.preferedTown?.region) || ""
      );
    }
    if (pharmacyContext?.preferedTown?.city) {
      url.searchParams.set(
        "town",
        encodeURIComponent(pharmacyContext?.preferedTown?.city) || ""
      );
    }

    const response = await fetch(url.toString(), {
      ...options?.headers,
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return await response.json();
  }
  return { apiFetch };
}
