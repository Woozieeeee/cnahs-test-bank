import SidebarHeader from "./sidebarHeader";
import SidebarNav from "./sidebarNav";
import SidebarLogoutButton from "./sidebarLogoutButton";

export default function AppSidebar() {
  return (
    <aside
      className="
      sticky
      top-0
      h-screen
      w-64
      border-r
      border-border
      bg-card
      p-5
    "
    >
      <SidebarHeader />

      <SidebarNav />

      <SidebarLogoutButton />
    </aside>
  );
}
