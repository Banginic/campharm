'use client'
export function getUserDetails(){
   const pharmacyDetails = localStorage.getItem('pharmacyDetails')
  if(!pharmacyDetails) return null
  const data = JSON.parse(pharmacyDetails)
  return data
}