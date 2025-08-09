import Image from "next/image"
import {  pharmacy_icon } from '@/assets/photos'

function NoPharmacy({ city}: {city: string}) {
  return (
    <div className="w-sm mx-auto mt-12 flex flex-col items-center">
      <Image
      src={pharmacy_icon}
      alt="./placeholder.png"
      width={50}
      height={50}
      />
      <h1 className="text-gray-600 mt-1">No Available Pharmacy in <span className="text-blue-500 font-semibold">{city}</span></h1>
    </div>
  )
}

export default NoPharmacy
