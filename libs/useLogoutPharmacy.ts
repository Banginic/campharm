'use client'
import { useRouter } from "next/router"
import { toast } from "react-toastify"

function useLogoutPharmacy() {
    const router = useRouter()
 localStorage.clear()
 toast.warning('Log out successfully')
 router.push('/pharmacy/login')
 
}

export default useLogoutPharmacy
