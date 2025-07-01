import React from "react";
export default function AdminLayout({ children }: { children: React.ReactNode}) {
  return (
    <html>
      <body>
        <aside className="bg-gray-900 text-white">Admin Sidebar</aside>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
