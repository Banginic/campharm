import { useApiClient } from "@/hooks/useApiPharmacyClient"
import { DrugTypes } from "@/models/types"

export async function fetchAllDrugs (){
      const {apiFetch} =  useApiClient<DrugTypes>()
      const data = await apiFetch('/api/drugs/list-all-drugs', { cache: 'force-cache'})
      return data
}