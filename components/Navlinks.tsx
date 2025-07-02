'use client'
import Link from "next/link";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { StaticImageData } from "next/image";
interface Props {
  name: string;
  icon: StaticImageData;
  href: string
}

function Navlinks({ navlinks }: { navlinks: Props[]}) {
const { preferedTown } = useContext(AppContext)!
  return (
    <ul className="item-center gap-4 font-semibold text-[16px] hidden lg:flex">
      {navlinks.map((item) => (
        <li key={item.name}>
          <Link className={!preferedTown && item.name === 'Pharmacies' ? 'hidden' : ''} href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Navlinks;
