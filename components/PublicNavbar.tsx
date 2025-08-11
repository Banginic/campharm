"use client";
import React, { useContext } from "react";
import {
  Logo,
  Navlinks,
  User,
  Hamburger,
  Language,
  Sidebar,
} from "@/components/index";
import { PUBLIC_NAVLINKS } from "@/assets/data";
import AppContext from "@/context/AppContext";
import Link from "next/link";

function PublicNavbar() {
  const { isMainSidebarOpen, toggleMainSidebar } = useContext(AppContext)!;
  return (
    <header className="h-[12dvh] flex items-center relative">
      <nav className="flex items-center justify-between px-6 lg:justify-around w-full">
        <Link href={"/"}>
          <Logo />
        </Link>
        <Navlinks navlinks={PUBLIC_NAVLINKS} />
        <div className="flex items-center gap-4">
          <Language />
          <div className="hidden lg:block">
            <User />
          </div>
          <Hamburger
            isSidebarOpen={isMainSidebarOpen}
            toggleSidebar={toggleMainSidebar}
          />
        </div>
      </nav>
      <aside>
        <Sidebar
          isSidebarOpen={isMainSidebarOpen}
          toggleSidebar={toggleMainSidebar}
          navlinks={PUBLIC_NAVLINKS}
        />
      </aside>
    </header>
  );
}

export default PublicNavbar;
