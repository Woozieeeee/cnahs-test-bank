import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Settings,
} from "lucide-react";

export const studentNav = [
  {
    href: "/student/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    href: "/student/subjects",
    label: "My Subjects",
    icon: BookOpen,
    nested: true,
  },

  {
    href: "/student/progress",
    label: "Progress",
    icon: Trophy,
    nested: true,
  },

  {
    href: "/student/settings",
    label: "Settings",
    icon: Settings,
    nested: true,
  },
];
