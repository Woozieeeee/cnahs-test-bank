interface Props {
  studentId: string;

  setStudentId: (value: string) => void;

  firstName: string;

  setFirstName: (value: string) => void;

  middleName: string;

  setMiddleName: (value: string) => void;

  lastName: string;

  setLastName: (value: string) => void;

  suffix: string;

  setSuffix: (value: string) => void;

  program: string;

  setProgram: (value: string) => void;
}

export default function StudentRecordFormFields({
  studentId,

  setStudentId,

  firstName,

  setFirstName,

  middleName,

  setMiddleName,

  lastName,

  setLastName,

  suffix,

  setSuffix,

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
            text-foreground
          "
        >
          Student ID
        </label>

        <input
          type="text"
          placeholder="22-03123"
          maxLength={8}
          value={studentId}
          onChange={(e) => {
            // REMOVE NON-DIGITS

            let value = e.target.value.replace(/\D/g, "");

            // LIMIT TO 7 DIGITS

            value = value.slice(0, 7);

            // FORMAT NN-NNNNN

            if (value.length > 2) {
              value =
                value.slice(0, 2) + "-" + value.slice(2);
            }

            setStudentId(value);
          }}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            transition
            focus:border-ring
          "
        />
      </div>

      {/* FIRST NAME */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-foreground
          "
        >
          First Name
        </label>

        <input
          type="text"
          placeholder="Juan"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            transition
            focus:border-ring
          "
        />
      </div>

      {/* MIDDLE NAME */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-foreground
          "
        >
          Middle Name (Optional)
        </label>

        <input
          type="text"
          placeholder="Perez"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            transition
            focus:border-ring
          "
        />
      </div>

      {/* LAST NAME */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-foreground
          "
        >
          Last Name
        </label>

        <input
          type="text"
          placeholder="Dela Cruz"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            transition
            focus:border-ring
          "
        />
      </div>

      {/* SUFFIX */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-foreground
          "
        >
          Suffix (Optional)
        </label>

        <input
          type="text"
          placeholder="Jr."
          value={suffix}
          onChange={(e) => setSuffix(e.target.value)}
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            transition
            focus:border-ring
          "
        />
      </div>

      {/* PROGRAM */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-foreground
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
            bg-card
            border-border
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
