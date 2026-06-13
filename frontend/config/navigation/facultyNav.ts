import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Activity,
  Settings,
} from "lucide-react";

export const facultyNav = [
  {
    href: "/faculty/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    href: "/faculty/subjects",
    label: "Subject Management",
    icon: BookOpen,
    nested: true,
  },

  {
    href: "/faculty/exams",
    label: "Exams",
    icon: ClipboardList,
    nested: true,
  },

  {
    href: "/faculty/activity-logs",
    label: "Activity Logs",
    icon: Activity,
    nested: true,
  },

  {
    href: "/faculty/settings",
    label: "Settings",
    icon: Settings,
  },
];
