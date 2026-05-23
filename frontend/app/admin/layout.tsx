import Sidebar from "@/components/admin/sidebar";

import Navbar from "@/components/admin/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        min-h-screen
        bg-gray-100
      "
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
