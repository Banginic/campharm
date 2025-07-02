import { DrugType } from "@/models/types";
import React from "react";

function DrugDetailsCard({ drug }: { drug: DrugType }) {
  return (
    <article>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Generic name</p>
          <p>{"Paracetamol"}</p>
        </div>
        <div>
          <p className="text-gray-600">Trade name</p>
          <p>{"Panadol"}</p>
        </div>
        <div>
          <p className="text-gray-600">Dosage strength</p>
          <p className="text-green-600">500mg</p>
        </div>
        <div>
          <p className="text-gray-600">Dosage form</p>
          <p className="text-yellow-800">{"Tablet"}</p>
        </div>
        <div>
          <p className="text-gray-600">Price</p>
          <p className="font-semibold">{"2,500"} xaf</p>
        </div>
      </div>
    </article>
  );
}

export default DrugDetailsCard;
