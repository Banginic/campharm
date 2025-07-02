import PharmacyNavbar from "@/components/PharmacyNavbar";
import React from "react";
export default function PharmacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <PharmacyNavbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
