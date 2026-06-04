import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
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
];
