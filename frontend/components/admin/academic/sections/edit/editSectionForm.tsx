"use client";

import { memo } from "react";

import { PROGRAM_OPTIONS } from "@/constant/academic";

import FormField from "@/components/common/form/formField";

import FormInput from "@/components/common/form/formInput";

import FormSelect from "@/components/common/form/formSelect";

import { YEAR_LEVEL_OPTIONS } from "@/components/common/form/formOptions";

interface Props {
  sectionCode: string;

  setSectionCode: (value: string) => void;

  yearLevel: number;

  setYearLevel: (value: number) => void;

  program: string;

  setProgram: (value: string) => void;
}

function EditSectionForm({
  sectionCode,
  setSectionCode,
  yearLevel,
  setYearLevel,
  program,
  setProgram,
}: Props) {
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
          onChange={(e) => {
            const value = e.target.value
              .replace(/[^A-Za-z]/g, "")
              .toUpperCase();

            setSectionCode(value);
          }}
        />
      </FormField>
    </div>
  );
}

export default memo(EditSectionForm);
