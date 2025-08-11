import { PharmacyDetailsTypes } from '@/models/types'
import { Phone } from 'lucide-react'
import React from 'react'

function PharmacyOnCallStatus({ data} :{data: PharmacyDetailsTypes}) {
  console.log(data)
  return (
    <div className="liquid-glass p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 transform lg:hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Phone className="size-5 lg:size-8 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-green-950/70 text-lg font-semibold">
                    {data?.data[0].isOnCall ? "Available" : "Unavailable"}
                  </p>
                  <p className="text-green-950/60  text-sm">On-Call Service</p>
                  {data?.data[0].isOnCall  && (
                    <p className="text-green-500 text-xs mt-1">
                      {data?.data[0].pharmacistName}
                    </p>
                  )}
                </div>
              </div>
            </div>
  )
}

export default PharmacyOnCallStatus
