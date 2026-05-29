import {
  BookOpen,
  Users,
  FolderKanban,
} from "lucide-react";

export const academicCards = [
  {
    title: "Sections",

    description: "Manage academic sections and classrooms.",

    href: "/admin/academic/sections",

    icon: Users,
  },

  {
    title: "Subjects",

    description: "Manage subjects and faculty assignments.",

    href: "/admin/academic/subjects",

    icon: BookOpen,
  },

  {
    title: "Student Records",

    description:
      "Manage official institutional student data.",

    href: "/admin/academic/student-records",

    icon: FolderKanban,
  },
];
