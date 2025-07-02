import { MY_DATA } from "@/assets/data";
import { banginic_logo } from "@/assets/photos";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function Logo({link}: { link: string}) {
  return (
    <Link href={link} className="flex items-center gap-2">
      <Image src={banginic_logo} width={30} alt={'./placeholder.png'} />
      <p className="font-semibold text-lg">{MY_DATA.appName}</p>
    </Link>
  );
}

export default Logo;
