import React from "react";
export default function PharmacyLayout({ children }: { children: React.ReactNode}) {
  return (
    <html>
      <body>
        <aside className="bg-blue-200">Pharmacy Sidebar</aside>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
