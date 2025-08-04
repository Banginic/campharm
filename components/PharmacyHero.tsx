import React from "react";
import { PharmacyDailyProgram, ManualClosePharmcy } from "@/components/index";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";

function PharmacyHero() {
  return (
    <section className="relative">
      <p className="text-xs lg:text-sm text-right font-medium text-neutral-600 w-sm lg:w-lg">
        Monday 04 August, 2025
      </p>
      <section className="liquid-glass mt-8 p-2 text-[16px] font-medium">
        <div className="p-2 liquid-glass-effect rounded-xl">
          <h1 className="text-green-500 text-lg lg:text-xl font-semibold text-center">
            Mercy Pharmacy
          </h1>

          <div className=" mt-4 font-normal">
            <div>
              <div className="border border-white/30 bg-white/20 backdrop:blur-2xl rounded-xl cursor-pointer hover:bg-white/30 transition p-4  shadow-md">
                <h2 className="mb-1  text-sm text-neutral-600">Drugs</h2>
                <hr className=" border-gray-300"/>
                <div className="flex my-2 justify-between gap-4 items-center flex-nowrap ">
                  <p className="flex flex-col">
                    <span className="text-neutral-600 text-sm">Total</span>
                    <span>100</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-neutral-600 text-sm">
                      Out of Stock
                    </span>
                    <span className="text-yellow-500">10</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              
              <PharmacyDailyProgram />
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              className="border rounded px-4 py-2 w-30 border-neutral-400  justify-center my-4 text-neutral-700 hover:border-neutral-800 cursor-pointer flex items-center gap-2"
              href={"/pharmacy/profile"}
            >
              <CircleUserRound size={18} />
              Profile
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

export default PharmacyHero;
