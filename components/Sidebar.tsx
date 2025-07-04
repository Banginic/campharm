"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { NAVLINKS } from "@/assets/data";
import { User } from "./index";
import { close_menu } from "@/assets/photos";

interface NavlinkTypes {
  name: string;
  icon: StaticImageData;
  href: string;
}

function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  navlinks,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  navlinks: NavlinkTypes[];
}) {
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
          <div onClick={toggleSidebar} className="px-8">
            <User />
          </div>
          {navlinks.map((item) => (
            <Link
              onClick={toggleSidebar}
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
