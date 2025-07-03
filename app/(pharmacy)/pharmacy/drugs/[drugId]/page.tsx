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
      <div className="mt-12 border shadow-lg rounded p-8 w-sm mx-auto border-gray-300 ">
        <div>
          <div>
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <ErrorFetching message={"Drugs"} refetch={refetch} />
            ) : !data?.data ? (
              <NoData message={"Drug"} />
            ) : (
              <div>
                <DrugDetailsCard drug={data?.data[0]} />
                <button className="border rounded py-2 px-4 mt-8 flex  hover:bg-red-500 text-red-500 hover:text-white border-red-600  cursor-pointer">
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
