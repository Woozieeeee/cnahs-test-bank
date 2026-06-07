"use client";

import { memo, useMemo } from "react";

import FormField from "@/components/common/forms/formField";
import FormInput from "@/components/common/forms/formInput";
import FormSelect from "@/components/common/forms/formSelect";

import {
  PROGRAM_OPTIONS,
  YEAR_LEVEL_OPTIONS,
} from "@/constant/academic";

interface Props {
  sectionCode: string;

  setSectionCode: (value: string) => void;

  yearLevel: number;

  setYearLevel: (value: number) => void;

  program: string;

  setProgram: (value: string) => void;
}

function SectionFormFields({
  sectionCode,
  setSectionCode,
  yearLevel,
  setYearLevel,
  program,
  setProgram,
}: Props) {
  const generatedName = useMemo(
    () => `${program}-${yearLevel}${sectionCode}`,
    [program, yearLevel, sectionCode]
  );

  return (
    <div className="mt-6 space-y-4">
      <FormField label="Program">
        <FormSelect
          value={program}
          options={PROGRAM_OPTIONS}
          onChange={(e) => setProgram(e.target.value)}
        />
      </FormField>

      <FormField label="Year Level">
        <FormSelect
          value={yearLevel}
          options={YEAR_LEVEL_OPTIONS}
          onChange={(e) =>
            setYearLevel(Number(e.target.value))
          }
        />
      </FormField>

      <FormField label="Section Code">
        <FormInput
          value={sectionCode}
          placeholder="A"
          maxLength={3}
          onChange={(e) =>
            setSectionCode(
              e.target.value
                .replace(/[^A-Za-z]/g, "")
                .toUpperCase()
            )
          }
        />
      </FormField>

      <div className="border-border bg-muted rounded-xl border border-dashed p-4">
        <p className="text-muted-foreground text-sm">
          Generated Section Name
        </p>

        <h3 className="text-foreground mt-1 text-lg font-semibold">
          {generatedName}
        </h3>
      </div>
    </div>
  );
}

export default memo(SectionFormFields);
