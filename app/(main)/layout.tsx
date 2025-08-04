'use client'
import React from "react";
import { Header, Sidebar } from '@/components/index'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const mainQueryClient = new QueryClient()
export default function MainLayout({ children }: { children: React.ReactNode}) {
  return (
    <QueryClientProvider client={mainQueryClient}>
      <div className="min-h-[85dvh] border relative  mx-auto py-12 sm:py-14">
        <Header />
        <main className="p-4 max-w-3xl mx-auto">{children}</main>
      </div>
    </QueryClientProvider>
  );
}
