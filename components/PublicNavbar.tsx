import React from "react";
import { Logo, Navlinks, User, Hamburger, Language } from "@/components/index";

function PublicNavbar() {
  return (
    <nav className="h-[13dvh] flex items-center">
      <div className="flex items-center justify-between px-6 lg:justify-around w-full">
        <Logo />
        <Navlinks />
        <div className="flex items-center gap-4">
          <Language />
          <div className="hidden lg:block">
            <User />
          </div>
          <Hamburger />
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
