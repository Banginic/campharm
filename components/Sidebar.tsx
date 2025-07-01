"use client";
import Link from "next/link";
import Image from "next/image";
import { NAVLINKS } from "@/assets/data";
import { User } from "./index";
import { close_menu } from "@/assets/photos";
import { useContext } from "react";
import AppContext from "@/context/AppContext";

function Sidebar() {
  const { toggleSidebar, isSidebarOpen } = useContext(AppContext)!;
  return (
    <div
      className={` ${
        isSidebarOpen ? "fixed" : "hidden"
      } lg:hidden  right-0 left-0 top-0 h-92 z-50 bg-white border border-gray-300 `}
    >
      <section className="relative bg-gray-300/20 h-full">
        <button
          onClick={toggleSidebar}
          className="absolute top-8 right-4 cursor-pointer"
        >
          <Image
            src={close_menu}
            width={35}
            height={35}
            alt="./placeholder.png"
          />
        </button>
        <div className=" p-4 flex flex-col gap-2 pt-12">
          <div className="px-8">
            <User />
          </div>
          {NAVLINKS.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="flex gap-2 items-center w-1/2 p-2 rounded hover:bg-gray-300/20 backdrop:blur-lg"
            >
              <Image
                src={item.icon}
                alt="./placeholder.png"
                width={25}
                height={25}
              />
              <p className="text-neutral-900">{item.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
