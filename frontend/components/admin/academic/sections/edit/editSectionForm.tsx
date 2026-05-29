"use client";

import { PROGRAMS } from "@/constant/program";

interface Props {
  sectionCode: string;

  setSectionCode: (value: string) => void;

  yearLevel: number;

  setYearLevel: (value: number) => void;

  program: string;

  setProgram: (value: string) => void;
}

export default function EditSectionForm({
  sectionCode,

  setSectionCode,

  yearLevel,

  setYearLevel,

  program,

  setProgram,
}: Props) {
  return (
    <div className="mt-6 space-y-4">
      {/* PROGRAM */}

      <select
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          text-foreground
          outline-none
          transition
          focus:border-ring
        "
      >
        {PROGRAMS.map((program) => (
          <option key={program} value={program}>
            {program}
          </option>
        ))}
      </select>

      {/* YEAR LEVEL */}

      <select
        value={yearLevel}
        onChange={(e) =>
          setYearLevel(Number(e.target.value))
        }
        className="
          w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          text-foreground
          outline-none
          transition
          focus:border-ring
        "
      >
        {[1, 2, 3, 4].map((year) => (
          <option key={year} value={year}>
            Year {year}
          </option>
        ))}
      </select>

      {/* SECTION CODE */}

      <input
        type="text"
        placeholder="A"
        value={sectionCode}
        onChange={(e) =>
          setSectionCode(e.target.value.toUpperCase())
        }
        className="
          w-full
          rounded-xl
          border
          border-input
          bg-background
          px-4
          py-3
          text-foreground
          outline-none
          transition
          focus:border-ring
        "
      />
    </div>
  );
}
