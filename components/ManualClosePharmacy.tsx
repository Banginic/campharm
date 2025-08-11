import {
  LogOut,
  Rss,
  WifiPen,
  CircleX,
  UserRoundPen,
  LoaderCircle,
} from "lucide-react";
import React from "react";
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "@/libs/queryClient";
import { PharmacyDetailsTypes } from "@/models/types";

function ManualClosePharmacy({data}: { data: PharmacyDetailsTypes}) {
  const { apiFetch } = useApiClient();
  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      apiFetch("/api/pharmacy/close-pharmacy", { method: "PUT" }),
    onSuccess: () => {
      toast.success("Pharmacy updated successfully"),
        queryClient.invalidateQueries({ queryKey: ["pharmacy-details"] });
    },
    onError: () => {
      toast.error("Error updating Pharmacy");
    },
  });


  return (
    <div className="mt-8">
      <button className="mb-4 text-sm flex gap-2 place-items-center py-2 px-4 text-neutral-700 cursor-pointer border-neutral-400 hover:border-neutral-800 hover:bg-red-800/20 rounded border w-full">
        <UserRoundPen size={18} />
        Update Details
      </button>
      {data?.data[0].isOpen ? (
        <div>
          <p className="flex items-center gap-2 mb-1 text-green-600">
            <Rss size={18} />
            <span className="text-xs  font-normal">Active and available</span>
          </p>
          <button
            onClick={() => mutate()}
            className={`cursor-pointer border ${
              isPending
                ? "border-yellow-400 animate-pulse cursor-wait "
                : "border-neutral-400 hover:border-neutral-800"
            }   text-neutral-700 w-full text-sm rounded py-2 px-4 flex gap-2 items-center`}
          >
            {isPending ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <LogOut size={18} />
            )}
            Close Pharmacy{" "}
            <span className="text-xs italic text-neutral-500">
              ( Will require manualy opening )
            </span>
          </button>
        </div>
      ) : (
        <div className="">
          <p className="flex items-center gap-2 mb-1 text-red-400">
            <CircleX size={18} />
            <span className="text-xs  font-normal">
              You are currently closed.
            </span>
          </p>
          <button
          onClick={() => mutate()}
          className={`cursor-pointer w-full border ${ !data.data[0].isOpen ? 'border-red-300' : 'border-neutral-400'} inline-flex  hover:border-neutral-600 hover:bg-green-800/20 text-neutral-700 text-sm rounded py-2 px-4  gap-2 items-center`}>
            
            {isPending ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <WifiPen size={18} />
            )}
            Open Pharmacy
          </button>
        </div>
      )}
    </div>
  );
}

export default ManualClosePharmacy;
