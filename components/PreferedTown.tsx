"use client";
import AppContext from "@/context/AppContext";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import { ChangeCity } from "./index";
import { MapPin, CalendarArrowDown, Wifi } from "lucide-react";

function PreferedTown() {
  const [state, setState] = useState("all");
  const { preferedTown } = useContext(AppContext)!;

  return (
    <div>
      <div className="flex gap-2  my-4 rounded items-center justify-between mx-auto ">
        <div className="flex gap-4 flex-wrap mt-4">
        <ChangeCity />
          <button
            onClick={() => {
              setState("all");
            }}
            className={`  rounded ${
              state === "all" ? "bg-green-500 backdrop:blur-2xl border text-green-50 font-medium border-green-500/70 shadow-md" : "border border-green-900/30"
            } text-sm shadow cursor-pointer py-2 px-4  flex gap-2 items-center`}
          >
            <CalendarArrowDown size={18} className="" />
            All Pharmacies
          </button>
          <button
            onClick={() => {
              setState("open");
            }}
            className={`border  rounded ${
              state === "open"
                ? "bg-green-500 backdrop:blur-2xl text-green-50 font-medium border-green-500/70 shadow-md"
                : "border border-green-900/30"
            }  shadow cursor-pointer py-2 px-4 text-sm flex gap-2 items-center `}
          >
            <Wifi size={18} />
            Currently Open
          </button>
        </div>
      </div>
      <div className="flex items-center text-sm mt-2 gap-2 text-blue-500 mx-auto ">
          <MapPin size={18} />
        <p className="">
          {preferedTown?.city}
          {preferedTown?.city && ","}
        </p>
        <p className="">
          {preferedTown?.region} <span>{preferedTown?.region && "Region"}</span>
        </p>
      </div>
    </div>
  );
}

export default PreferedTown;
