import React from "react";
import Link from "next/link";
import LogoutPharmacyButton from "@/pharmacy-components/LogoutPharmacyButton";
import { BadgeAlert, UserRound } from 'lucide-react'

function User() {
  const truthy = false;

  return (
    <section className="lg:flex">
      {truthy ? (
        <Link href="/login" className="cursor-pointer">
          <button className="font-semibold">Sign In</button>
        </Link>
      ) : (
        <div className="relative group size-8 bg-black text-white rounded-full grid place-items-center">
          <p className="font-semibold cursor-pointer">B</p>
          <ul className=" border absolute hidden top-8 group-hover:block rounded-xl overflow-hidden border-green-200 bg-black text-neutral-300  text-[16px] ">
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-900 rounded-xl">
              <Link href={'/pharmacy/profile'} className="flex items-center gap-2">
               <UserRound size={18} />
              Profile</Link>
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-900 rounded-xl flex gap-2 items-center">
              <BadgeAlert size={18} />
              Verify</li>
            <li className="px-4 pb-2 cursor-pointer  hover:bg-gray-900 ">
              <LogoutPharmacyButton />
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default User;
