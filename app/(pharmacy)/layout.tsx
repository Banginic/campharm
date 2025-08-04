'use client'
import PharmacyNavbar from "@/components/PharmacyNavbar";
import React from "react";
import PharmacyProvider from "@/context/PharmacyProvider";
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export default function PharmacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <div 
        
        style={{
          backgroundImage: "url('/bg_image.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}>
          <Toaster position="top-right" />
        <QueryClientProvider client={queryClient}>
          <PharmacyProvider>
            <PharmacyNavbar />
            <main className="p-4">{children}</main>
          </PharmacyProvider>
        </QueryClientProvider>
      </div>
    
  );
}
