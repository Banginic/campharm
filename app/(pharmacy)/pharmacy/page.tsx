'use client'
import { Loading, PharmacyHero } from '@/components/index'
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { PharmacyDetailsTypes } from "@/models/types";
import { useQuery } from '@tanstack/react-query';

export default function PharmacyDashboard() {

  const {apiFetch} =  useApiClient<PharmacyDetailsTypes>()


  const { data, isLoading, isError} =  useQuery({
      queryKey: ['pharmacy'],
      queryFn: () => apiFetch('/api/pharmacy/pharmacy-details', { cache: 'force-cache'})
    })
    if(isLoading) return <Loading />
    if(!data){
      return null
    }
  return <div className="text-2xl  mx-auto">
    <PharmacyHero data ={data} />
  </div>;
}
