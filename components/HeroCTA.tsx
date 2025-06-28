import Link from "next/link";
import Image from "next/image";
import React from "react";
import { start } from "@/assets/photos";

function HeroCTA() {
  return (
    <Link href={'/purpose'}>
      <button className="flex cursor-pointer items-center gap-2 bg-black text-white py-2 px-4 rounded-md shadow-sm">
        <p>Get started</p>
        <Image src={start} alt={'./placeholder.png'} width={24} height={24} />
      </button>
    </Link>
  );
}

export default HeroCTA;
