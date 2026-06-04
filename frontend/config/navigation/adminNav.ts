import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  History,
} from "lucide-react";

export const adminNav = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },

  {
    href: "/admin/academic",
    label: "Academic Management",
    icon: GraduationCap,
    nested: true,
  },

  {
    href: "/admin/exams",
    label: "Exams",
    icon: ClipboardList,
    nested: true,
  },

  {
    href: "/admin/activity-logs",
    label: "Activity Logs",
    icon: History,
    nested: true,
  },
];
