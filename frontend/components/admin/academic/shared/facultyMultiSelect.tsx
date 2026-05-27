"use client";

import { useMemo, useState } from "react";

interface Faculty {
  id: number;

  name: string;
}

interface Props {
  facultyList: Faculty[];

  selectedFaculty: number | null;

  setSelectedFaculty: (value: number | null) => void;
}

export default function FacultySelect({
  facultyList,
  selectedFaculty,
  setSelectedFaculty,
}: Props) {
  const [search, setSearch] = useState("");

  // =========================
  // FILTER FACULTY
  // =========================

  const filteredFaculty = useMemo(() => {
    return facultyList.filter((faculty) =>
      faculty.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [facultyList, search]);

  return (
    <div className="space-y-4">
      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search faculty..."
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

      {selectedFaculty && (
        <div>
          {facultyList
            .filter(
              (faculty) => faculty.id === selectedFaculty
            )
            .map((faculty) => (
              <button
                key={faculty.id}
                onClick={() => setSelectedFaculty(null)}
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
                {faculty.name} ✕
              </button>
            ))}
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
        {filteredFaculty.map((faculty) => {
          const selected = selectedFaculty === faculty.id;

          return (
            <button
              key={faculty.id}
              onClick={() => setSelectedFaculty(faculty.id)}
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
                {faculty.name}
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

        {filteredFaculty.length === 0 && (
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
            No faculty found.
          </div>
        )}
      </div>
    </div>
  );
}
