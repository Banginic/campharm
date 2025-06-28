import React from "react";
import Image from "next/image";
import { search_icon } from "@/assets/photos";

function Searchbar() {
  return (
    <div className="border rounded border-gray-300 py-2 px- flex gap-4 items-center px-2 w-sm mx-auto">
      <Image
        src={search_icon}
        alt="./placeholder.png"
        width={30}
        height={30}
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
