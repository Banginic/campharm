import AppContext from "@/context/AppContext";
import { useContext } from "react";

export function useApiClient<T>(){
    const {lang, preferedTown} = useContext(AppContext)!;

   async function apiFetch(endpoint: string, options?: RequestInit): Promise<T>{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const url = new URL(endpoint, baseUrl)

    url.searchParams.set('lang', lang || 'en');
    // url.searchParams.set('country', preferedTown?.countrry);
    url.searchParams.set('region', preferedTown?.region || '')
    url.searchParams.set('town', preferedTown?.city || '')
  
    const response = await fetch(url.toString(), {
        ...options?.headers,
        headers: { 'Content-Type': 'application/json'}
    })
    if(!response.ok){
        throw new Error (`API request failed: ${response.statusText}`)
    }
    return await response.json()
    
}
return { apiFetch}
}

