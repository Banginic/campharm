import React from "react";
import Link from "next/link";
import { DrugType } from "@/models/types";

function DrugCard({ drug }: { drug: DrugType }) {
  return (
    <Link href={`/pharmacy/drugs/${drug.id}`}>
      <article className="w-sm mt-8 hover:bg-gray-50 border text-sm mx-auto justify-between flex gap-2 items-center border-gray-300 p-4 rounded cursor-pointer">
        <div>
          <p className="text-gray-600">Generic name</p>
          <p>{drug.genericName}</p>
        </div>
        <div>
          <p className="text-gray-600">Trade name</p>
          <p>{drug.tradeName}</p>
        </div>
        <div>
          <p className="text-gray-600">Strength</p>
          <p>500mg</p>
        </div>
        <div>
          <p className="text-gray-600">Form</p>
          <p>{drug.dosageForm}</p>
        </div>
      </article>
    </Link>
  );
}

export default DrugCard;
