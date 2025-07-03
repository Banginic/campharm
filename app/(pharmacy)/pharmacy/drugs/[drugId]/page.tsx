import React from "react";
import { Back, DrugDetailsCard } from "@/components/index";
import { drugs } from "@/constants/drugs";

function page({ params }: { params: { drugId: string } }) {
  const { drugId } = params;
  return (
    <section className="relative ">
      <div className="absolute">
        <Back link="/pharmacy/drugs" />
      </div>
      <h1 className="text-lg font-bold lg:text-3xl text-center">
        Drug Details
      </h1>
      <div className="mt-12 border shadow-lg rounded p-8 w-sm mx-auto border-gray-300">
        <DrugDetailsCard drug={drugs[0]} />
        <button className="border rounded py-2 px-4 mt-8 flex  hover:bg-red-500 text-red-500 hover:text-white border-red-600  cursor-pointer">
          Delete drug
        </button>
      </div>
    </section>
  );
}

export default page;
