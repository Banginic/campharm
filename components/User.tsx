import React from "react";
import Link from "next/link";
import LogoutPharmacyButton from "@/pharmacy-components/LogoutPharmacyButton";
import { BadgeAlert, LogOut, UserRound } from 'lucide-react'
import { useSession } from "next-auth/react";

function User() {
    const { data: session, status } = useSession();


  return (
    <section className="lg:flex">
      {!session ? (
        <Link href="/pharmacy/sign-up" className="cursor-pointer">
          <button className="font-semibold   px-4 py-2 text-sm cursor-pointer">Create Account</button>
        </Link>
      ) : (
        <div className="relative group size-8 bg-black text-white rounded-full z-100  grid place-items-center">
          <p className="font-semibold cursor-pointer">B</p>
          <ul className=" border absolute hidden top-8 group-hover:block rounded-xl overflow-hidden border-green-200 bg-black text-neutral-300 w-32 text-[16px] ">
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-900 rounded-xl">
              <Link href={'/pharmacy/profile'} className="flex items-center gap-2">
               <UserRound size={18} />
              Profile</Link>
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-900 rounded-xl flex gap-2 items-center">
              <BadgeAlert size={18} />
              Verify</li>
            <li className="px-4 pb-2 text-red-400 cursor-pointer flex gap-2 items-center  hover:bg-gray-900 ">
              <LogOut size={18} />
              <LogoutPharmacyButton />
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default User;
