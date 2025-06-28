import { place_holder_img, start } from "@/assets/photos";
import Image from "next/image";
import React from "react";

function HeroCTA() {
  return (
    <div>
      <button className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-md shadow-sm">
        <p>Get started</p>
        <Image src={start} alt={'./placeholder.png'} width={24} height={24} />
      </button>
    </div>
  );
}

export default HeroCTA;
