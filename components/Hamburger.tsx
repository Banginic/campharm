"use client";
import React from "react";
import Image from "next/image";
import { close_menu, menu_open } from "@/assets/photos";


function Hamburger({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div className="lg:hidden">
      {isSidebarOpen ? (
        <button onClick={toggleSidebar} className="cursor-pointer w-8">
          <Image src={close_menu} width={35} alt="./placholder.png" />
        </button>
      ) : (
        <button onClick={toggleSidebar} className="cursor-pointer w-8">
          <Image src={menu_open} width={30} alt="./placholder.png" />
        </button>
      )}
    </div>
  );
}

export default Hamburger;
