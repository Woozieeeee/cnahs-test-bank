interface Props {
  studentId: string;

  setStudentId: (value: string) => void;

  fullName: string;

  setFullName: (value: string) => void;

  program: string;

  setProgram: (value: string) => void;
}

export default function StudentRecordFormFields({
  studentId,

  setStudentId,

  fullName,

  setFullName,

  program,

  setProgram,
}: Props) {
  return (
    <div className="mt-6 space-y-4">
      {/* STUDENT ID */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Student ID
        </label>

        <input
          type="text"
          placeholder="22-03123"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
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

      {/* FULL NAME */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Full Name
        </label>

        <input
          type="text"
          placeholder="Juan Dela Cruz"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
    </div>
  );
}
