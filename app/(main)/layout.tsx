import React from "react";
import { Header, Sidebar } from '@/components/index'
export default function MainLayout({ children }: { children: React.ReactNode}) {
  return (
    <>
      <div className="min-h-[85dvh] border relative  mx-auto py-12 sm:py-14">
        <Header />
        <main className="p-4 max-w-3xl mx-auto">{children}</main>
      </div>
    </>
  );
}
