"use client";
import React, { useContext } from "react";
import { DrugCard, DrugForm } from "@/pharmacy-components/index";
import { NoData, ErrorFetching, Loading, Title } from "@/components/index";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { useQuery } from "@tanstack/react-query";
import { DrugTypes } from "@/models/types";
import { CirclePlus } from "lucide-react";
import { no_drug } from "@/assets/photos";
import { useApiClient } from "@/hooks/useApiPharmacyClient";

function Drug() {
  const { showAddDrugForm, setDrugForm } = useContext(PharmacyContext)!;
  
  const { apiFetch } = useApiClient<DrugTypes>()
    const { isError, isLoading, data, refetch } = useQuery({
      queryKey: ["pharmacy-drugs"],
      queryFn: () => apiFetch('/api/drugs/list-all-drugs?limit=20', { method: 'GET', }),
    });



  return (
    <section className="relative max-w-2xl mx-auto ">
      <Title text="Drugs" />
      <button
        onClick={() => setDrugForm(true)}
        className="px-4 py-2 ml-6 lg:ml-35 mt-8 flex items-center gap-2 rounded bg-black text-white cursor-pointer hover:bg-black/70"
      >
        <CirclePlus size={18} />
        Add drug
      </button>
      <div className="min-h-[50dvh] mt-4 w-full  rounded grid place-items-center">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorFetching message={"Drugs"} refetch={refetch} />
        ) : data?.data?.length === 0 ? (
          <NoData message={"Drugs"} photo={no_drug} />
        ) : null}
        <div className="liquid-glass p-2 lg:p-4">
          {data?.data &&
            data.data.map((item) => <DrugCard drug={item} key={item.id} />)}
        </div>
      </div>

      <div
        className={`${
          showAddDrugForm
            ? "fixed overflow-y-scroll scrollbar-hidden "
            : "hidden"
        } bg-black/70 backdrop:blur-md inset-0 z-50 grid place-items-center`}
      >
        <DrugForm />
      </div>
    </section>
  );
}

export default Drug;
