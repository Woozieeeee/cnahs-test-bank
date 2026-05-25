import SidebarNavItem from "./sidebarNavItem";

const navItems = [
  {
    href: "/admin/dashboard",

    label: "Dashboard",
  },

  {
    href: "/admin/users",

    label: "Users",
  },

  {
    href: "/admin/exams",

    label: "Exams",
  },

  {
    href: "/admin/activity-logs",

    label: "Activity Logs",
  },
];

export default function SidebarNav() {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <SidebarNavItem
          key={item.href}
          href={item.href}
          label={item.label}
        />
      ))}
    </nav>
  );
}
