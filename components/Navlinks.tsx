import React from "react";
import Link from "next/link";
import { NAVLINKS } from "@/assets/data";

function Navlinks() {
  return (
    <ul className="flex item-center gap-4 font-semibold text-[16px]">
      {NAVLINKS.map((item) => (
        <li key={item.name}>
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Navlinks;
