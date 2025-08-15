import Image from "next/image"
import {  pharmacy_icon } from '@/assets/photos'

function NoPharmacy({ city}: {city: string}) {
  return (
    <div className="w-sm mx-auto mt-32 lg:mt-12 flex flex-col items-center">
      <Image
      src={pharmacy_icon}
      alt="./placeholder.png"
      width={80}
      height={60}
      />
      <h1 className="text-gray-600 mt-1 text-lg">No Available Pharmacy in <span className="text-blue-500 font-semibold">{city}</span></h1>
    </div>
  )
}

export default NoPharmacy
