import { Pill, ShieldCheck, UserCircle, UserPen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function PharmacyHeroCTA() {
  return (
   <div className="flex justify-between items-center mt-8">
            <div className=" flex flex-wrap gap-4 j lg:justify-start">
              <Link
                href={"/pharmacy/profile"}
                className=" flex items-center gap-2 bg-black text-sm hover:bg-black/70 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform lg:hover:scale-105 shadow-lg cursor-pointer lg:hover:shadow-xl"
              >
                <UserCircle size={18} />
                <span className="text-sm text-white">Profile</span>
              </Link>
              <Link
                href={"/pharmacy/view-orders"}
                className=" flex items-center gap-2 bg-purple-600 text-sm hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform lg:hover:scale-105 shadow-lg cursor-pointer lg:hover:shadow-xl"
              >
                <Pill size={18} />
                <span className="text-sm text-white">View Orders</span>
              </Link>
              <Link
                href={"/pharmacy/staff-schedule"}
                className=" flex items-center gap-2 bg-green-600 text-sm hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform lg:hover:scale-105 shadow-lg cursor-pointer lg:hover:shadow-xl"
              >
                <UserPen size={18} />
                <span className="text-sm text-white">Staff Schedule</span>
              </Link>
              <Link
                href={"/pharmacy/Inventory-management"}
                className=" flex items-center gap-2 bg-blue-700 text-sm hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform lg:hover:scale-105 shadow-lg cursor-pointer lg:hover:shadow-xl"
              >
                <ShieldCheck size={18} />
                <span className="text-sm text-white">Manage Inventory</span>
              </Link>
            </div>
          </div>
  )
}

export default PharmacyHeroCTA
