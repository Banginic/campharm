

import React from "react";
import MainDrugDetails from "@/pages/MainDrugDetails";
import { notFound } from "next/navigation";

interface DrugDetailsProps {
  searchParams: {
    drugId?: string;
    pharmacyId?: string;
  };
}

export default async function DrugDetailsPage({ searchParams }: DrugDetailsProps) {
  const { drugId, pharmacyId } = await searchParams;

  if (!drugId || !pharmacyId) {
    return notFound();
  }

  return (
    <div>
      <MainDrugDetails pharmacyId={pharmacyId} drugId={drugId} />
    </div>
  );
}
