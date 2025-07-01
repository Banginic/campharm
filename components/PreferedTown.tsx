"use client";
import AppContext from "@/context/AppContext";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import { ChangeCity } from "./index";

function PreferedTown() {
  const [state, setState] = useState("all");
  const { preferedTown } = useContext(AppContext)!;

  return (
    <div>
      <div className="flex gap-4 rounded items-center p-4 w-[90%] lg:w-[60%] justify-around mx-auto mt-1">
        <ChangeCity />
        <div className="flex gap-4">
          <button
            onClick={() => {
              setState("all");
            }}
            className={`border py-2 px-4 rounded ${
              state === "all"
                ? "bg-green-900 text-white"
                : "border border-green-900"
            } text-sm shadow cursor-pointer `}
          >
            All Pharmacies
          </button>
          <button
            onClick={() => {
              setState("open");
            }}
            className={`border py-2 px-4 rounded ${
              state === "open"
                ? "bg-green-900 text-white"
                : "border border-green-900"
            } text-sm shadow cursor-pointer `}
          >
            Currently Open
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mx-auto w-sm mb-8">
        <p className="font-semibold">
          {preferedTown?.city}
          {preferedTown?.city && ","}
        </p>
        <p className="font-semibold">
          {preferedTown?.region} <span>{preferedTown?.region && "Region"}</span>
        </p>
      </div>
    </div>
  );
}

export default PreferedTown;
