import { LogOut, Rss, WifiPen, CircleX, UserRoundPen } from "lucide-react";
import React from "react";

function ManualClosePharmacy() {
  const status = true;
  return (
    <div className="mt-8">
        <button className="mb-4 text-sm flex gap-2 place-items-center py-2 px-4 text-neutral-700 cursor-pointer border-neutral-400 hover:border-neutral-800 rounded border w-full">
            <UserRoundPen size={18} />
            Update Details</button>
      {status ? (
        <div>
          <p className="flex items-center gap-2 mb-1 text-green-600">
            <Rss size={18} />
            <span className="text-xs  font-normal">Active and available</span>
          </p>
          <button className="cursor-pointer border border-neutral-400 hover:border-neutral-800 text-neutral-700 w-full text-sm rounded py-2 px-4 flex gap-2 items-center">
            Close Pharmacy
            <LogOut size={18} />
          </button>
        </div>
      ) : (
        <div className="">
          <p className="flex items-center gap-2 mb-1 text-red-400">
            <CircleX size={18} />
            <span className="text-xs  font-normal">Active but Unavailable</span>
          </p>
          <button className="cursor-pointer w-full border inline-flex border-neutral-400 hover:border-neutral-600 text-neutral-700 text-sm rounded py-2 px-4  gap-2 items-center">
            <WifiPen size={18} />
            Open Pharmacy
          </button>
        </div>
      )}
    </div>
  );
}

export default ManualClosePharmacy;
