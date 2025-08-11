"use client";
import React, { useContext, use } from "react";
import {
  Back,
  DrugDetailsCard,
  NoData,
  Loading,
  ErrorFetching,
  Title,
  Spiner,
} from "@/components/index";
import { useQuery } from "@tanstack/react-query";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { DrugType } from "@/models/types";
import { no_drug } from "@/assets/photos";
import { CirclePlus, CircleX, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryClient } from "@/libs/queryClient";

interface DataType {
  error?: string;
  data?: [] | DrugType[];
  message?: string;
  success: boolean;
}
function DrugDetails({ params }: { params: Promise<{ drugId: string }> }) {
  const { pharmacyDetails } = useContext(PharmacyContext)!;
  const { drugId } = use(params);

  const router = useRouter();

  async function toggleInStock() {
    const response = await fetch(
      `/api/drugs/update-instock?pharmacyId=${pharmacyDetails?.id}&drugId=${drugId}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  }
  async function deleteDrug() {
    const response = await fetch(
      `/api/drugs/delete-single-drug?pharmacyId=${pharmacyDetails?.id}&drugId=${drugId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  }
  async function returnFn(): Promise<DataType> {
    const response = await fetch(
      `/api/drugs/list-single-drug?pharmacyId=${pharmacyDetails?.id}&drugId=${drugId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  }

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [`drugs-${drugId}`],
    queryFn: returnFn,
  });

  const {
    isPending: updateLoader,
    isError: updateError,
    mutate: updateMutate,
  } = useMutation({
    mutationFn: toggleInStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`drugs-${drugId}`] });
    },
  });
  const {
    isPending: deleteLoader,
    isError: deleteError,
    mutate: deleteMutate,
  } = useMutation({
    mutationFn: deleteDrug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drugs"] });
      router.push("/pharmacy/drugs");
    },
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
            ) : isError || deleteError || updateError ? (
              <ErrorFetching message={"Drugs"} refetch={refetch} />
            ) : !data?.data || data?.data.length === 0 ? (
              <NoData message={"Drug"} photo={no_drug} />
            ) : (
              <div className="p-4 liquid-glass-effect rounded-2xl">
                <DrugDetailsCard drug={data?.data[0]} />
                <div className="mt-4">
                  {data.data[0].inStock ? (
                    <p className="text-green-600 text-sm">
                      Drug is currently in stock.
                    </p>
                  ) : (
                    <p className="text-red-400 text-sm">
                      Drug is currently out of stock.
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <span>
                    {data.data[0].inStock ? (
                      <button
                        onClick={() => updateMutate()}
                        className={`border rounded py-2 px-4 text-sm mt-8 w-36 flex gap-2 items-center shadow-2xl hover:bg-gray-800 text-white hover:text-white border-gray-900 bg-black/70  cursor-pointer ${
                          updateLoader && "animate-pulse opacity-70"
                        }`}
                      >
                        {updateLoader ? (
                          <Spiner color="white" height="size-5" />
                        ) : (
                          <CircleX size={22} />
                        )}
                        Out of stock
                      </button>
                    ) : (
                      <button
                        onClick={() => updateMutate()}
                        className={`border rounded py-2 px-4 text-sm mt-8 w-32 flex gap-2 items-center shadow-2xl hover:bg-green-800 text-green-100 hover:text-white border-green-900 bg-green-800  cursor-pointer ${
                          updateLoader && "animate-pulse opacity-60"
                        }`}
                      >
                        {updateLoader ? (
                          <Spiner color="white" height="size-5" />
                        ) : (
                          <CirclePlus size={22} />
                        )}
                        Refill Drug
                      </button>
                    )}
                  </span>

                  <button
                    onClick={() => deleteMutate()}
                    className="border rounded py-2 text-sm px-4 mt-8 flex gap-2 items-center shadow-2xl hover:bg-red-400 text-red-400  hover:text-white border-red-400  cursor-pointer"
                  >
                    {deleteLoader ? (
                      <Spiner color="white" height="size-5" />
                    ) : (
                      <Trash size={18} />
                    )}
                    Delete drug
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DrugDetails;
