'use client'
import Link from "next/link";
import { NAVLINKS } from "@/assets/data";
import { useContext } from "react";
import AppContext from "@/context/AppContext";


function Navlinks() {
const { preferedTown } = useContext(AppContext)!
  return (
    <ul className="item-center gap-4 font-semibold text-[16px] hidden lg:flex">
      {NAVLINKS.map((item) => (
        <li key={item.name}>
          <Link className={!preferedTown && item.name === 'Pharmacies' ? 'hidden' : ''} href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Navlinks;
