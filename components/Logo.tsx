import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Medyro pharmacy logo"
        width={35}
        height={20}
        className="border"
      />
      <p className="font-semibold text-lg lg:text-2xl text-green-950">Medyro</p>
    </div>
  );
}

export default Logo;
