"use client";
import React, { useContext } from "react";
import { Logo, Hamburger, Language, User, Navlinks, Sidebar } from "./index";
import { PHARMACY_NAVLINKS } from "@/assets/data";
import AppContext from "@/context/AppContext";

function PharmacyNavbar() {
  const { isPharmacySidebarOpen, togglePharmacySidebar } =
    useContext(AppContext)!;
  return (
    <header className="h-[13dvh] flex items-center relative">
      <nav className="flex items-center justify-between px-6 lg:justify-around w-full">
        <Logo link="/pharmacy" />
        <Navlinks navlinks={PHARMACY_NAVLINKS} />
        <div className="flex items-center gap-4">
          <Language />
          <Hamburger
            isSidebarOpen={isPharmacySidebarOpen}
            toggleSidebar={togglePharmacySidebar}
          />
          <div className="hidden lg:block">
            <User />
          </div>
        </div>
      </nav>
      <div>
        <Sidebar
          isSidebarOpen={isPharmacySidebarOpen}
          toggleSidebar={togglePharmacySidebar}
          navlinks={PHARMACY_NAVLINKS}
        />
      </div>
    </header>
  );
}

export default PharmacyNavbar;
