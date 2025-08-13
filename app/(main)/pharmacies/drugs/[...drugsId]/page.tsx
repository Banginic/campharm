'use client'
import React from 'react'
import { useParams } from 'next/navigation'
// import  MainDrugDetails  from '@/pages/MainDrugDetails'
import { Loading } from '@/components/index'

function page() {

const params = useParams()
const drugsId = params?.drugsId
const pharmacyId = Array.isArray(drugsId) ? drugsId[0] : drugsId
const drugId = Array.isArray(drugsId) ? drugsId[1] : drugsId

if(!pharmacyId || !drugId ) return <Loading />

  return (
    <div>
      {/* <MainDrugDetails pharmacyId={pharmacyId} drugId={drugId} /> */}
    </div>
  )
}

export default page
