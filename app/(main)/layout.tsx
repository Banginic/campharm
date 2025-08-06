'use client'
import React from "react";
import { Header, Sidebar } from '@/components/index'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const mainQueryClient = new QueryClient()
export default function MainLayout({ children }: { children: React.ReactNode}) {
  return (
    <QueryClientProvider client={mainQueryClient}>
      <div className="min-h-[85dvh]  relative  mx-auto ">
        <Header />
        <main className="">{children}</main>
      </div>
    </QueryClientProvider>
  );
}
