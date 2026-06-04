import { memo, useCallback } from "react";

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

const inputClassName = `
  mt-2
  w-full
  rounded-xl
  border
  border-border
  px-4
  py-3
  outline-none
  transition-all
  duration-200
  text-foreground
  bg-card
  focus:border-ring
`;

function StudentRecordFormFields({
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
  // =========================
  // FORMAT STUDENT ID
  // =========================

  const handleStudentIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, "");

      value = value.slice(0, 7);

      if (value.length > 2) {
        value = value.slice(0, 2) + "-" + value.slice(2);
      }

      setStudentId(value);
    },
    [setStudentId]
  );

  return (
    <div className="mt-6 space-y-4">
      {/* STUDENT ID */}

      <div>
        <label
          htmlFor="studentId"
          className="text-foreground text-sm font-medium"
        >
          Student ID
        </label>

        <input
          id="studentId"
          type="text"
          placeholder="22-03123"
          autoComplete="off"
          maxLength={8}
          value={studentId}
          onChange={handleStudentIdChange}
          className={inputClassName}
        />
      </div>

      {/* FIRST NAME */}

      <div>
        <label
          htmlFor="firstName"
          className="text-foreground text-sm font-medium"
        >
          First Name
        </label>

        <input
          id="firstName"
          type="text"
          placeholder="Juan"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClassName}
        />
      </div>

      {/* MIDDLE NAME */}

      <div>
        <label
          htmlFor="middleName"
          className="text-foreground text-sm font-medium"
        >
          Middle Name (Optional)
        </label>

        <input
          id="middleName"
          type="text"
          placeholder="Perez"
          autoComplete="additional-name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className={inputClassName}
        />
      </div>

      {/* LAST NAME */}

      <div>
        <label
          htmlFor="lastName"
          className="text-foreground text-sm font-medium"
        >
          Last Name
        </label>

        <input
          id="lastName"
          type="text"
          placeholder="Dela Cruz"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={inputClassName}
        />
      </div>

      {/* SUFFIX */}

      <div>
        <label
          htmlFor="suffix"
          className="text-foreground text-sm font-medium"
        >
          Suffix (Optional)
        </label>

        <input
          id="suffix"
          type="text"
          placeholder="Jr."
          autoComplete="off"
          value={suffix}
          onChange={(e) => setSuffix(e.target.value)}
          className={inputClassName}
        />
      </div>

      {/* PROGRAM */}

      <div>
        <label
          htmlFor="program"
          className="text-foreground text-sm font-medium"
        >
          Program
        </label>

        <select
          id="program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className={inputClassName}
        >
          <option value="BSN">BSN</option>

          <option value="BSIT">BSIT</option>

          <option value="BSCS">BSCS</option>
        </select>
      </div>
    </div>
  );
}

export default memo(StudentRecordFormFields);
