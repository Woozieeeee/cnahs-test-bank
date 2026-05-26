interface Props {
  name: string;

  setName: (value: string) => void;

  yearLevel: number;

  setYearLevel: (value: number) => void;

  program: string;

  setProgram: (value: string) => void;
}

export default function SectionFormFields({
  name,

  setName,

  yearLevel,

  setYearLevel,

  program,

  setProgram,
}: Props) {
  return (
    <div className="mt-6 space-y-4">
      {/* SECTION NAME */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Section Name
        </label>

        <input
          type="text"
          placeholder="Nursing 4A"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            outline-none
            transition
            focus:border-slate-400
          "
        />
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

        <input
          type="text"
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
            outline-none
            transition
            focus:border-slate-400
          "
        />
      </div>
    </div>
  );
}
