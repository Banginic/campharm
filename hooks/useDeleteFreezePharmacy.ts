'use client'
import { useMutation } from "@tanstack/react-query"
import { useApiClient } from "./useApiPharmacyClient";
import { PharmaciesTypes } from "@/models/types";
import { toast } from "react-toastify";
import { queryClient } from "@/libs/queryClient";
import { useRouter } from "next/navigation";


export function useFreezePharmacy() {
 
  const { apiFetch } = useApiClient<PharmaciesTypes>();
  return useMutation({
    mutationFn:() => apiFetch("api/pharmacy/freeze-single-pharmacy", {
    method: "PUT",
    body: JSON.stringify({})
  }),
    onSuccess:() =>{
        toast.success('Pharmacy updated successfully.')
        queryClient.invalidateQueries({queryKey: ['pharmacy-details']})
    },
    onError: () =>{
        toast.warning('Error updating pharmacy.')
    }
  })

}
export function useDeletePharmacy() {
   const router = useRouter()
  const { apiFetch } = useApiClient<PharmaciesTypes>();
  return useMutation({
    mutationFn:() => apiFetch("api/pharmacy/delete-single-pharmacy", {
    method: "DELETE",
    body: JSON.stringify({})
  }),
    onSuccess:() =>{
        toast.success('Sad to see you go.')
        queryClient.invalidateQueries({queryKey: ['pharmacy-profile']})
        localStorage.clear()
        router.push('/pharmacy/login')
    },
    onError: () =>{
        toast.warning('Error deleting pharmacy.')
    }
  })

}

