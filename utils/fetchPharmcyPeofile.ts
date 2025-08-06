'use client'
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { PharmacyDetailsTypes } from "@/models/types";
export async function fetchPharmacyDetails(): Promise<PharmacyDetailsTypes>{
  const {apiFetch} =  useApiClient<PharmacyDetailsTypes>()
  const data = await apiFetch('/api/pharmacy/pharmacy-details', { cache: 'force-cache'})
  return data
}