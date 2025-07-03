"use client";
import React, { useContext } from "react";
import { DrugCard, DrugForm } from "@/pharmacy-components/index";
import { NoData, ErrorFetching, Loading } from "@/components/index";
import { PharmacyContext } from "@/context/PharmacyProvider";
import myFetch from "@/libs/myFetch";
import { useQuery } from "@tanstack/react-query";
import { DrugType } from "@/models/types";

interface DataType{
  error?: string;
  data?: [] | DrugType[]
  message?: string;
  success: boolean
}
function Drug() {
  const { pharmacyDetails } = useContext(PharmacyContext)!;
  function returnFn() {
    const fetchDetails = {
      method: "post",
      body: "",
      id: "",
      endpoint: `/api/get-drugs?pharmacyId=${pharmacyDetails?.id ?? ""}`,
    };
    return myFetch<DataType>(fetchDetails);
  }
  const { showAddDrugForm, setDrugForm } = useContext(PharmacyContext)!;

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ["drugs"],
    queryFn: returnFn,
  });

  return (
    <section className="relative max-w-2xl mx-auto ">
      <h1 className="text-lg font-bold lg:text-3xl text-center">Drugs</h1>
      <button
        onClick={() => setDrugForm(true)}
        className="px-4 py-2 ml-6 lg:ml-35 mt-8 rounded bg-black text-white cursor-pointer hover:bg-black/70"
      >
        Add drug
      </button>
      <div className="min-h-[50dvh] mt-4 w-full rounded grid place-items-center">
        {
          isLoading ? (
            <Loading />
          ) : isError ? (
            <ErrorFetching message={"Drugs"} refetch={refetch} />
          ) : !data ?(
            <NoData message={'Drug'} />
          ) : null
        }
        <div>
          {
            data?.data && data?.data.map(item => (
              <DrugCard drug={item} />
            ))
          }
        </div>
        </div>
        
      <div
        className={`${
          showAddDrugForm ? "fixed" : "hidden"
        } bg-black/70 backdrop:blur-md inset-0 z-50 grid place-items-center`}
      >
        <DrugForm />
      </div>
    </section>
  );
}

export default Drug;
