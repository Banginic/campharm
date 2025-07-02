import PharmacyNavbar from "@/components/PharmacyNavbar";
import React from "react";
import PharmacyProvider from "@/context/PharmacyProvider";
export default function PharmacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <PharmacyProvider>
          <PharmacyNavbar />
        <main className="p-4">{children}</main>
        </PharmacyProvider>
      </body>
    </html>
  );
}
