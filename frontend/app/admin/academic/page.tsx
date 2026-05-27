"use client";

import Link from "next/link";
import MotionCard from "@/components/motion/motionCard";

import {
  BookOpen,
  Users,
  FolderKanban,
} from "lucide-react";

const academicCards = [
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

export default function AcademicPage() {
  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-foreground
          "
        >
          Academic Management
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage academic structure, sections, subjects, and
          institutional records.
        </p>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {academicCards.map((card) => {
          const Icon = card.icon;

          return (
            <MotionCard key={card.title}>
              <Link
                href={card.href}
                className="
        block
        rounded-2xl
        border
        border-border
        bg-card
        p-6
        transition
        hover:border-ring
        hover:shadow-md
      "
              >
                <div
                  className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-muted
        "
                >
                  <Icon
                    size={22}
                    className="text-foreground"
                  />
                </div>

                <h2
                  className="
          mt-5
          text-xl
          font-semibold
          text-card-foreground
        "
                >
                  {card.title}
                </h2>

                <p
                  className="
          mt-2
          text-sm
          leading-relaxed
          text-muted-foreground
        "
                >
                  {card.description}
                </p>
              </Link>
            </MotionCard>
          );
        })}
      </div>
    </div>
  );
}
