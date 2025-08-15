"use client";
import { useState, useEffect } from "react";
import { PharmacyCard, NoPharmacy, Loading } from "./index";
import { PharmaciesDailySchedule } from "@/models/types";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/hooks/useApiClient";
import PharmacySkeleton from "./skeletons/PharmacySkeleton";

function PharmacyGrid() {
  const [preferedTown, setPreferedTown] = useState<{ region: string; city: string } | null>(null);
  const { apiFetch } = useApiClient<PharmaciesDailySchedule>();

  // Get from localStorage in useEffect (so SSR doesn't break too)
  useEffect(() => {
    const storedTown = localStorage.getItem("preferedTown");
    if (storedTown) {
      setPreferedTown(JSON.parse(storedTown));
    }
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["client-pharmacies", preferedTown?.region, preferedTown?.city],
    queryFn: () =>
      apiFetch(
        `/api/pharmacy/list-town-pharmacies?limit=15`,
        { method: "GET" }
      ),
    enabled: !!preferedTown, // only run query when town is loaded
  });

  // Loading while getting from localStorage or fetching
  if (!preferedTown || isPending) return <PharmacySkeleton />;

  if (!data || data.data.length === 0) {
    return <NoPharmacy city={preferedTown.city} />;
  }

  return (
    <section className="mt-8">
      {data.data.map((pharmacy) => (
        <PharmacyCard pharmacy={pharmacy} key={pharmacy.pharmacyId} />
      ))}
    </section>
  );
}

export default PharmacyGrid;
