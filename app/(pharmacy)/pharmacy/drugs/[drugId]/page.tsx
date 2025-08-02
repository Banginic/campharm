"use client";
import React, { useContext, use } from "react";
import {
  Back,
  DrugDetailsCard,
  NoData,
  Loading,
  ErrorFetching,
  Title,
} from "@/components/index";
import { useQuery } from "@tanstack/react-query";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { DrugType } from "@/models/types";
import { drugs } from "@/assets/data";
import { no_drug } from "@/assets/photos";
import { Trash } from "lucide-react";

interface DataType {
  error?: string;
  data?: [] | DrugType[];
  message?: string;
  success: boolean;
}
function DrugDetails({ params }: { params: Promise<{ drugId: string }> }) {
  const { pharmacyDetails } = useContext(PharmacyContext)!;
  const { drugId } = use(params);

  async function returnFn() :Promise<DataType> {
    const response = await fetch(`/api/drugs/list-single-drug?pharmacyId=${pharmacyDetails?.id}&drugId=${drugId}`,{
      method: 'GET',
      credentials: 'include'
    })
    const data  = await response.json()
    return data
  }

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [`drug-${drugId}`],
    queryFn: returnFn,
  });
 
  return (
    <section className="relative ">
      <div className="absolute">
        <Back link="/pharmacy/drugs" />
      </div>
      <Title text="Drug Details" />
      <div className="mt-12 border   w-[90%] lg:w-lg  mx-auto border-gray-300 ">
        <div>
          <div>
            {isLoading ? (
              <Loading />
            ) : isError && !drugs ? (
              <ErrorFetching message={"Drugs"} refetch={refetch} />
            ) : !data?.data || data?.data.length === 0 ? (
              <NoData message={"Drug"} photo={no_drug} />
            ) : (
              <div className="p-4 liquid-glass-effect rounded-2xl">
                <DrugDetailsCard drug={data?.data[0]} />
                <button className="border rounded py-2 px-4 mt-8 flex gap-2 items-center shadow-2xl hover:bg-red-400 text-red-400 hover:text-white border-red-400  cursor-pointer">
                  <Trash size={18} />
                  Delete drug
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DrugDetails;
