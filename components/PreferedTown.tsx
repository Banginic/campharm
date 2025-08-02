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
      <div className="flex gap-2 mt-4 liquid-glass-effect p-4 rounded items-center min-w-sm w-[450px] lg:w-[60%] justify-between mx-auto ">
        <ChangeCity />
        <div className="flex gap-4">
          <button
            onClick={() => {
              setState("all");
            }}
            className={`  rounded ${
              state === "all" ? "bg-green-500/50 backdrop:blur-2xl text-green-950 border-green-500/70 shadow-md" : "border border-green-900/30"
            } text-sm shadow cursor-pointer py-2 px-4 text-nowrap `}
          >
            All Pharmacies
          </button>
          <button
            onClick={() => {
              setState("open");
            }}
            className={`border  rounded ${
              state === "open"
                ? "bg-green-500/50 backdrop:blur-2xl text-green-950 border-green-500/70 shadow-md"
                : "border border-green-900/30"
            }  shadow cursor-pointer py-2 px-4 text-sm`}
          >
            Currently Open
          </button>
        </div>
      </div>
      <div className="flex items-center mt-2 gap-2 mx-auto mb-8 min-w-sm w-[450px] lg:w-[60%]">
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
