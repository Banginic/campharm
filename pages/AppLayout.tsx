"use client";

import AppProvider from "@/context/AppProvider";
import { Footer } from "@/components/index";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/queryClient";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <main className="min-h-[85dvh] mx-auto">{children}</main>
        <Footer />
      </AppProvider>
    </QueryClientProvider>
  );
}
