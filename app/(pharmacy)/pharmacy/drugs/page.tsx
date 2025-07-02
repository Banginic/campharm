"use client";
import React, { useContext } from "react";
import { DrugCard, DrugForm } from "@/pharmacy-components/index";
import { drugs } from "@/constants/drugs";
import { PharmacyContext } from "@/context/PharmacyProvider";

function Drug() {
  const { showAddDrugForm, setDrugForm } = useContext(PharmacyContext)!;
  return (
    <section className="relative">
      <h1 className="text-lg font-bold lg:text-3xl text-center">Drugs</h1>
      <button
        onClick={() => setDrugForm(true)}
        className="px-4 py-2 rounded bg-black text-white cursor-pointer hover:bg-black/70"
      >
        Add drug
      </button>
      <DrugCard drug={drugs[0]} />
      <div
        className={`${
          showAddDrugForm ? "fixed" : "hidden"
        } bg-black/70 backdrop:blur-md inset-0 z-50 grid place-items-center`}
      >
        <DrugForm />
      </div>
    </section>
  );
}

export default Drug;
