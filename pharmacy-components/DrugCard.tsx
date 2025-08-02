import React from "react";
import Link from "next/link";
import { DrugType } from "@/models/types";

function DrugCard({ drug }: { drug: DrugType }) {
  return (
    <Link href={`/pharmacy/drugs/${drug.id}`} className=" bg-red-500">
      <article className={`min-w-sm my-2 shadow-md ${drug.inStock ? 'liquid-glass-effect' : 'liquid-glass-red'}  hover:bg-green-50 border text-sm mx-auto justify-between flex gap-2 items-center border-neutral-300 p-4 rounded-xl cursor-pointer`}>
        <div>
          <p className="text-neutral-600 text-xs">Generic name</p>
          <p>{drug?.genericName}</p>
        </div>
        <div>
          <p className="text-neutral-600 text-xs">Trade name</p>
          <p>{drug?.tradeName}</p>
        </div>
        <div>
          <p className="text-neutral-600 text-xs">Strength</p>
          <p>{drug?.dosageStrength}</p>
        </div>
        <div>
          <p className="text-neutral-600 text-xs">Form</p>
          <p>{drug?.dosageForm}</p>
        </div>
      </article>
    </Link>
  );
}

export default DrugCard;
