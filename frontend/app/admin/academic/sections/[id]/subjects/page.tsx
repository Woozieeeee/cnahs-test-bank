"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getSectionById } from "@/services/academic_service";

import type { Section } from "@/types/section";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

export default function SectionSubjectsPage() {
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
    return <div className="p-6">Loading subjects...</div>;
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
            Section Subjects
          </h1>

          <p
            className="
              mt-2
              text-muted-foreground
            "
          >
            Subjects assigned to {section.name}.
          </p>
        </div>
      </div>

      {/* SUBJECTS LIST */}

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
          {section.sectionSubjects.map((sectionSubject) => {
            const subject = sectionSubject.subject;

            return (
              <div
                key={sectionSubject.id}
                className="
                    rounded-xl
                    border
                    border-border
                    bg-background
                    p-4
                  "
              >
                <div
                  className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                >
                  <div>
                    <p
                      className="
                          text-xs
                          font-medium
                          uppercase
                          tracking-wide
                          text-muted-foreground
                        "
                    >
                      {subject.code}
                    </p>

                    <h2
                      className="
                          mt-1
                          text-lg
                          font-semibold
                          text-foreground
                        "
                    >
                      {subject.name}
                    </h2>
                  </div>

                  <div
                    className="
                        rounded-full
                        bg-blue-100
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        text-blue-700
                      "
                  >
                    Active
                  </div>
                </div>

                {/* FACULTY */}

                <div
                  className="
                      mt-4
                      rounded-xl
                      bg-muted
                      px-4
                      py-3
                    "
                >
                  <p
                    className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-muted-foreground
                      "
                  >
                    Assigned Faculty
                  </p>

                  <p
                    className="
                        mt-1
                        text-sm
                        font-medium
                        text-foreground
                      "
                  >
                    {subject.faculty?.name ||
                      "No faculty assigned"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
