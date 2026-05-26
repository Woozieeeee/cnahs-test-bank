interface Props {
  sectionCode: string;

  setSectionCode: (value: string) => void;

  yearLevel: number;

  setYearLevel: (value: number) => void;

  program: string;

  setProgram: (value: string) => void;
}

export default function SectionFormFields({
  sectionCode,

  setSectionCode,

  yearLevel,

  setYearLevel,

  program,

  setProgram,
}: Props) {
  const generatedName = `${program} ${yearLevel}${sectionCode}`;

  return (
    <div className="mt-6 space-y-4">
      {/* PROGRAM */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Program
        </label>

        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
          "
        >
          <option value="BSN">BSN</option>
        </select>
      </div>

      {/* YEAR LEVEL */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Year Level
        </label>

        <select
          value={yearLevel}
          onChange={(e) =>
            setYearLevel(Number(e.target.value))
          }
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
          "
        >
          <option value={1}>1st Year</option>

          <option value={2}>2nd Year</option>

          <option value={3}>3rd Year</option>

          <option value={4}>4th Year</option>
        </select>
      </div>

      {/* SECTION CODE */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Section Code
        </label>

        <input
          type="text"
          placeholder="A"
          value={sectionCode}
          onChange={(e) =>
            setSectionCode(e.target.value.toUpperCase())
          }
          maxLength={2}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            uppercase
            outline-none
            transition
            focus:border-slate-400
          "
        />
      </div>

      {/* GENERATED NAME */}

      <div
        className="
          rounded-xl
          border
          border-dashed
          border-slate-300
          bg-slate-50
          p-4
        "
      >
        <p className="text-sm text-slate-500">
          Generated Section Name
        </p>

        <h3
          className="
            mt-1
            text-lg
            font-semibold
            text-slate-900
          "
        >
          {generatedName}
        </h3>
      </div>
    </div>
  );
}
