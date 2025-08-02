"use client";
import React, { useContext } from "react";
import { DrugCard, DrugForm } from "@/pharmacy-components/index";
import { NoData, ErrorFetching, Loading, Title } from "@/components/index";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { useQuery } from "@tanstack/react-query";
import { DrugType } from "@/models/types";
import { CirclePlus } from "lucide-react";
import { no_drug } from "@/assets/photos";

interface DataType{
  error?: string;
  data?: [] | DrugType[]
  message?: string;
  success: boolean
}
function Drug() {
  const { pharmacyDetails } = useContext(PharmacyContext)!;
  async function returnFn(): Promise<DataType | null> {
    if(!pharmacyDetails?.id){
      return null
    }
    const response = await fetch(`/api/drugs/list-all-drugs?pharmacyId=${pharmacyDetails.id }&limit=14`, {
        method: 'GET' })
   const data = await response.json()
   return data
    
  }
  const { showAddDrugForm, setDrugForm } = useContext(PharmacyContext)!;

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ["drugs"],
    queryFn: returnFn,
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
        {
          isLoading ? (
            <Loading />
          ) : isError ? (
            <ErrorFetching message={"Drugs"} refetch={refetch} />
          ) :  data?.data?.length === 0 ?(
            <NoData message={'Drug'} photo={no_drug}/>
          ) : null
        }
        <div className="liquid-glass p-2 lg:p-4">
          {
            data?.data && data.data.map(item => (
              <DrugCard drug={item} key={item.id} />
            ))
          }
        </div>
        </div>
        
      <div
        className={`${
          showAddDrugForm ? "fixed overflow-y-scroll scrollbar-hidden " : "hidden"
        } bg-black/70 backdrop:blur-md inset-0 z-50 grid place-items-center`}
      >
        <DrugForm />
      </div>
    </section>
  );
}

export default Drug;
