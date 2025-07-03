import { DrugType } from "@/models/types";
import React from "react";

function DrugDetailsCard({ drug }: { drug: DrugType }) {
  return (
    <article>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Generic name</p>
          <p>{drug.genericName}</p>
        </div>
        <div>
          <p className="text-gray-600">Trade name</p>
          <p>{drug.tradeName}</p>
        </div>
        <div>
          <p className="text-gray-600">Dosage strength</p>
          <p className="text-green-600">{drug.dosageStrength}</p>
        </div>
        <div>
          <p className="text-gray-600">Dosage form</p>
          <p className="text-yellow-800">{drug.dosageForm}</p>
        </div>
        <div>
          <p className="text-gray-600">Price</p>
          <p className="font-semibold">{drug.price} xaf</p>
        </div>
      </div>
    </article>
  );
}

export default DrugDetailsCard;
