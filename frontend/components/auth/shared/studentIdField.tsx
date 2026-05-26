interface Props {
  studentId: string;

  onChange: (value: string) => void;
}

export default function StudentIdField({
  studentId,

  onChange,
}: Props) {
  const studentIdRegex = /^\d{2}-\d{5}$/;

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Student ID (22-03213)"
        value={studentId}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          rounded
          border
          p-3

          ${
            studentId.length === 8 &&
            !studentIdRegex.test(studentId)
              ? "border-red-500"
              : "border-gray-300"
          }
        `}
        required
      />

      {studentId.length === 8 &&
        !studentIdRegex.test(studentId) && (
          <p className="mt-1 text-sm text-red-500">
            Format must be nn-nnnnn
          </p>
        )}
    </div>
  );
}
