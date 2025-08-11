import React from "react";
import { Header,  } from '@/components/index'

export default function MainLayout({ children }: { children: React.ReactNode}) {
  return (
      <div className="min-h-[85dvh]  relative  mx-auto ">
        <Header />
        <main className="">{children}</main>
      </div>
  );
}
