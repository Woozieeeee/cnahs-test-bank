import AppSidebar from "@/components/layout/sidebar/appSidebar";
import Navbar from "@/components/layout/navbar/navbar";

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
      <AppSidebar />

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
