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
    href: "/admin/academic",

    label: "Academic Management",

    nested: true,
  },

  {
    href: "/admin/exams",

    label: "Exams",

    nested: true,
  },

  {
    href: "/admin/activity-logs",

    label: "Activity Logs",

    nested: true,
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
          nested={item.nested}
        />
      ))}
    </nav>
  );
}
