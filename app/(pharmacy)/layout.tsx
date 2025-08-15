'use client'
import PharmacyNavbar from "@/components/PharmacyNavbar";
import React from "react";
import PharmacyProvider from "@/context/PharmacyProvider";
import { Toaster } from 'react-hot-toast'


export default function PharmacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <div 
        >
          <Toaster position="top-right" />
     
          <PharmacyProvider>
            <PharmacyNavbar />
            <main className="p-4">{children}</main>
          </PharmacyProvider>
      </div>
    
  );
}
