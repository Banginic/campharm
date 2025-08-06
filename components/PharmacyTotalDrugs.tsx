import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { DrugTypes } from "@/models/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "./Loading";
import { Package } from "lucide-react";

function PharmacyTotalDrugs() {
  const { apiFetch } = useApiClient<DrugTypes>();
  const { isLoading, data } = useQuery({
    queryKey: ["drugs"],
    queryFn: () => apiFetch("/api/drugs/list-all-drugs", { cache: 'force-cache', }),
    refetchInterval: 520000
  });

  if (isLoading) return <Loading />;
  return (
    <div className=" p-4 liquid-glass border border-white/20 hover:bg-white/15 transition-all duration-300 transform lg:hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Package className="size-5 lg:size-8 text-blue-500" />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-950/70 ">
            {data?.data.length}
          </p>
          <p className="text-green-950/60  text-sm">Total Medications</p>
        </div>
      </div>
    </div>
  );
}

export default PharmacyTotalDrugs;
