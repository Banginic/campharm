"use client";
import { useEffect, useState } from "react";
import { PharmacyCard, NoPharmacy, Loading } from "./index";
import { PharmaciesTypes } from "@/models/types";
import { useQuery } from "@tanstack/react-query";

function PharmacyGrid() {
  const [pharmacies, setPharmacies] = useState<PharmaciesTypes | null>(null);
  const [isLoading, setLoading] = useState(false);

  const preferedTownInLS = localStorage.getItem("preferedTown");
  if (preferedTownInLS === null) return <Loading />;
  const preferedTown = JSON.parse(preferedTownInLS);

  async function fetchFunction(): Promise<PharmaciesTypes> {
    const res = await fetch(
      `/api/pharmacy/list-town-pharmacies?region=${
        preferedTown?.region
      }&city=${encodeURIComponent(preferedTown.city)}&limit=15`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    setPharmacies(data);
    return data;
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["client-pharmacies"],
    queryFn: fetchFunction,
  });

  if (isLoading || isPending) return <Loading />;

  if (!data) {
    return <NoPharmacy city={preferedTown?.city!} />;
  }

  return (
    <section>
      <div>
        {pharmacies &&
          pharmacies.data?.map((pharmacy) => (
            <PharmacyCard pharmacy={pharmacy} key={pharmacy.id} />
          ))}
      </div>
    </section>
  );
}

export default PharmacyGrid;
