import { DrugType } from "@/models/types";
import React from "react";

function DrugDetailsCard({ drug }: { drug: DrugType }) {
  return (
    <div className="liquid-glass-effect p-2 rounded-xl ">
      <article>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-600">Generic name</p>
            <p>{drug.genericName}</p>
          </div>
          <div>
            <p className="text-neutral-600">Trade name</p>
            <p>{drug.tradeName ? drug.tradeName : 'None provided'}</p>
          </div>
          <div>
            <p className="text-neutral-600">Dosage strength</p>
            <p className="text-green-600">{drug.dosageStrength}</p>
          </div>
          <div>
            <p className="text-neutral-600">Dosage form</p>
            <p className="text-yellow-800">{drug.dosageForm}</p>
          </div>
          <div>
            <p className="text-neutral-600">Price</p>
            <p className="font-semibold">{drug.price ? drug.price.toFixed(2) : 0.0} xaf</p>
          </div>
        </div>
        <div className="bg-green-100/50 mt-3 p-2 rounded">
          <p className="text-neutral-600">Description</p>
          <p className="text-neutral-500 text-sm">{drug.description}</p>
        </div>
      </article>
    </div>
  );
}

export default DrugDetailsCard;
