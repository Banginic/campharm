import React from "react";
import Image from "next/image";
import { search_icon } from "@/assets/photos";

function Searchbar() {
  return (
    <div className="border min-w-sm w-[450px] lg:w-[60%]  bg-white/20 backdrop:blur-2xl rounded-sm border-white/30 shadow-md py-2.5 px-4 flex gap-3 items-center  mx-auto">
      <Image
        src={search_icon}
        alt="./placeholder.png"
        width={25}
        height={25}
        className=""
      />
      <input
        type="text"
        maxLength={10}
        placeholder="Search drug here"
        className="border-none outline-none flex-1"
      />
      <button className="cursor-pointer hover:font-semibold trans">
        Search
      </button>
    </div>
  );
}

export default Searchbar;
