import React from "react";
import Link from "next/link";
import LogoutPharmacyButton from "@/pharmacy-components/LogoutPharmacyButton";


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
          <ul className=" border absolute hidden top-8 group-hover:block border-gray-300 w-24 shadow-md bg-white text-black rounded text-[16px] ">
            <li className="px-2 py-1 cursor-pointer hover:bg-gray-50">
              Profile
            </li>
            <li className="px-2 cursor-pointer hover:bg-gray-50">Verify</li>
            <li className="px-2 pb-1 cursor-pointer hover:bg-red-50">
              <LogoutPharmacyButton />
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default User;
