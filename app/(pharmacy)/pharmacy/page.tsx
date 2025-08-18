"use client";
import { Loading, PharmacyHero } from "@/components/index";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { PharmacyDetailsTypes } from "@/models/types";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default function PharmacyDashboard() {
  const { pharmacyDetails } = useContext(PharmacyContext)!;
  const { apiFetch } = useApiClient<PharmacyDetailsTypes>();

//  const session = await getServerSession(authOptions)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pharmacy-details"],
    queryFn: () =>
      apiFetch("/api/pharmacy/pharmacy-details", {
        method: "GET",
        cache: "force-cache",
      }),
    enabled : pharmacyDetails !== null
  });
  useEffect(() => {
  if (isError) {
    console.error('Fetch error:', error);
  }
}, [isError, error]);

  if (!pharmacyDetails || isLoading) return <Loading />;

  if (isError) return <p>Error loading pharmacy data.</p>;

  if (!data) return <p>Empty</p>;

  return (
    <div className="text-2xl mx-auto">
      <PharmacyHero data={data} />
    </div>
  );
}
