"use client";
import React, { useContext } from "react";
import {
  Back,
  DrugDetailsCard,
  NoData,
  Loading,
  ErrorFetching,
} from "@/components/index";
import { useQuery } from "@tanstack/react-query";
import myFetch from "@/libs/myFetch";
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
function DrugDetails({ params }: { params: { drugId: string } }) {
  const { pharmacyDetails } = useContext(PharmacyContext)!;
  const { drugId } = params;

  function returnFn() {
    const fetchDetails = {
      endpoint: `/api/single-drug?pharmacyId=${pharmacyDetails?.id}&drugId=${drugId}`,
      id: drugId,
      body: "",
      method: "get",
    };
    return myFetch<DataType>(fetchDetails);
  }

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [`drug-${drugId}`],
    queryFn: returnFn,
  });
  console.log(data);
  return (
    <section className="relative ">
      <div className="absolute">
        <Back link="/pharmacy/drugs" />
      </div>
      <h1 className="text-lg font-bold lg:text-3xl text-center">
        Drug Details
      </h1>
      <div className="mt-12 border   w-[90%] lg:w-lg  mx-auto border-gray-300 ">
        <div>
          <div>
            {isLoading ? (
              <Loading />
            ) : isError && !drugs ? (
              <ErrorFetching message={"Drugs"} refetch={refetch} />
            ) : !data?.data && !drugs ? (
              <NoData message={"Drug"} photo={no_drug} />
            ) : (
              <div className="p-2 liquid-glass-effect rounded-2xl">
                <DrugDetailsCard drug={drugs[0]} />
                <button className="border rounded py-2 px-4 mt-8 flex gap-2 items-center  hover:bg-red-400 text-red-400 hover:text-white border-red-400  cursor-pointer">
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
