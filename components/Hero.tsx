import React from 'react'
import { HeroCTA } from './index'

function Hero() {
  return (
    <div className="px-8 grid place-items-center text-center mt-30 md:mt-12 2xl:mt-34 relative w-full overflow-hidden lg:overflow-visible">
       <h2 className="text-gray-600 mb-1">
             Bringing the Pharmacy to Your Fingertips.
           </h2>
         <h2 className="heading2 montserrat text-3xl lg:text-5xl font-bold leading-10 lg:leading-14.5">
           YOUR TRUSTED PARTNER IN <span className="text-green-900">HEALTH</span> &
           WELLNESS.
         </h2>
         <div className="text-neutral-900 mb-8">
          
           <p className="paragraph1 text text-gray-900 mt-2 font-semibold t">
             Search for any medication any where in Cameroon, and see the nearest
             pharmacy close to you.
           </p>
         </div>
         <HeroCTA />
         <div className="size-30 -top-30 left-0 lg:size-40 2xl:size-50 absolute md:left-30 md:top-10 lg:-bottom-50 rounded-full bg-gradient-to-b from-green-300/20  to-white/20"></div>
         <div className="size-80 lg:size-104 absolute -right-40 -bottom-80 lg:-bottom-50 rounded-full bg-gradient-to-b from-green-200/20  to-white/20"></div>
       </div>
  )
}

export default Hero
