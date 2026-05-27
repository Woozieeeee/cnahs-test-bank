"use client";

import { useMemo, useState } from "react";

interface Section {
  id: number;

  name: string;
}

interface Props {
  sections: Section[];

  selectedSections: number[];

  setSelectedSections: (value: number[]) => void;
}

export default function SectionMultiSelect({
  sections,
  selectedSections,
  setSelectedSections,
}: Props) {
  const [search, setSearch] = useState("");

  // =========================
  // FILTER SECTIONS
  // =========================

  const filteredSections = useMemo(() => {
    return sections.filter((section) =>
      section.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [sections, search]);

  // =========================
  // TOGGLE SECTION
  // =========================

  const toggleSection = (id: number) => {
    if (selectedSections.includes(id)) {
      setSelectedSections(
        selectedSections.filter(
          (sectionId) => sectionId !== id
        )
      );

      return;
    }

    setSelectedSections([...selectedSections, id]);
  };

  return (
    <div className="space-y-4">
      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search sections..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          text-sm
          text-foreground
          outline-none
          transition
          focus:border-ring
          focus:ring-2
          focus:ring-ring/20
        "
      />

      {/* SELECTED */}

      {selectedSections.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSections.map((id) => {
            const section = sections.find(
              (s) => s.id === id
            );

            if (!section) return null;

            return (
              <button
                key={id}
                onClick={() => toggleSection(id)}
                className="
                  rounded-full
                  bg-primary
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-primary-foreground
                "
              >
                {section.name} ✕
              </button>
            );
          })}
        </div>
      )}

      {/* LIST */}

      <div
        className="
          max-h-72
          space-y-2
          overflow-y-auto
        "
      >
        {filteredSections.map((section) => {
          const selected = selectedSections.includes(
            section.id
          );

          return (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                border
                px-4
                py-3
                text-left
                transition

                ${
                  selected
                    ? `
                      border-primary
                      bg-primary/10
                    `
                    : `
                      border-border
                      bg-card
                      hover:bg-muted
                    `
                }
              `}
            >
              <span
                className="
                  text-sm
                  font-medium
                  text-foreground
                "
              >
                {section.name}
              </span>

              <div
                className={`
                  h-5
                  w-5
                  rounded-full
                  border

                  ${
                    selected
                      ? `
                        border-primary
                        bg-primary
                      `
                      : `
                        border-border
                      `
                  }
                `}
              />
            </button>
          );
        })}

        {filteredSections.length === 0 && (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-border
              bg-muted/40
              p-6
              text-center
              text-sm
              text-muted-foreground
            "
          >
            No sections found.
          </div>
        )}
      </div>
    </div>
  );
}
