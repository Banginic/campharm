
import { notFound } from "next/navigation";
import MainDrugDetails from "@/pages/MainDrugDetails";
import { use } from "react";

interface DrugDetailsProps {
  searchParams: Promise<{
    drugId?: string;
    pharmacyId?: string;
  }>;
}

export default function DrugDetailsPage({ searchParams }: DrugDetailsProps) {
  const { drugId, pharmacyId } = use(searchParams);

  if (!drugId || !pharmacyId) return notFound();

  return <MainDrugDetails pharmacyId={pharmacyId} drugId={drugId} />;}
