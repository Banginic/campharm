'use client'
import PharmacyNavbar from "@/components/PharmacyNavbar";
import React from "react";
import PharmacyProvider from "@/context/PharmacyProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export default function PharmacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <PharmacyProvider>
            <PharmacyNavbar />
            <main className="p-4">{children}</main>
          </PharmacyProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
