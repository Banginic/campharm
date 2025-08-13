import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <Image
      src="/medyro_logo.png"
      alt="Medyro pharmacy logo"
      width={150}
      height={20}
      className="border"
    />
  );
}

export default Logo;
