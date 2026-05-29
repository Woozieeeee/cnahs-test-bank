"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getSectionById } from "@/services/academic_service";

import type { Section } from "@/types/section";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

export default function SectionStudentsPage() {
  const params = useParams();

  const id = Number(params.id);

  const [section, setSection] = useState<Section | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSection = async () => {
      try {
        const data = await getSectionById(id);

        setSection(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [id]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <div className="p-6">Loading students...</div>;
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!section) {
    return <div className="p-6">Section not found.</div>;
  }

  return (
    <PageContainer>
      {/* HEADER */}

      <div className="space-y-4">
        <BackButton
          href={`/admin/academic/sections/${section.id}`}
          label="Back to Section Overview"
        />

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-foreground
            "
          >
            Section Students
          </h1>

          <p
            className="
              mt-2
              text-muted-foreground
            "
          >
            Students enrolled in {section.name}.
          </p>
        </div>
      </div>

      {/* STUDENTS LIST */}

      <div
        className="
          rounded-2xl
          border
          border-border
          bg-card
          p-6
        "
      >
        <div className="space-y-3">
          {section.users.map((student) => {
            const initials =
              student.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "ST";

            return (
              <div
                key={student.id}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-border
                  bg-background
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  {/* AVATAR */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-muted
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    {initials}
                  </div>

                  {/* INFO */}

                  <div>
                    <p
                      className="
                        text-sm
                        font-medium
                        text-foreground
                      "
                    >
                      {student.name}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-muted-foreground
                      "
                    >
                      {student.studentId}
                    </p>
                  </div>
                </div>

                {/* STATUS */}

                <div
                  className="
                    rounded-full
                    bg-green-100
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-green-700
                  "
                >
                  Active
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
