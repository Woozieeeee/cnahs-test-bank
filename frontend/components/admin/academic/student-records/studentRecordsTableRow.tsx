import { memo, useMemo } from "react";

interface StudentRecord {
  id: number;
  studentId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  program: string;
  section?: {
    name: string;
  } | null;
}

interface Props {
  record: StudentRecord;

  onEdit: (record: StudentRecord) => void;
}

const cellClassName = `
  px-6
  py-4
  text-sm
`;

function StudentRecordsTableRow({ record, onEdit }: Props) {
  const fullName = useMemo(() => {
    return [
      record.lastName + ",",
      record.firstName,
      record.middleName,
      record.suffix,
    ]
      .filter(Boolean)
      .join(" ");
  }, [record]);

  return (
    <tr className="border-border hover:bg-muted/30 border-t transition-colors">
      <td className={` ${cellClassName} text-foreground`}>
        {record.studentId}
      </td>

      <td
        className={` ${cellClassName} text-card-foreground font-medium`}
      >
        {fullName}
      </td>

      <td className={` ${cellClassName} text-foreground`}>
        {record.program}
      </td>

      <td className={` ${cellClassName} text-foreground`}>
        {record.section?.name || "Unassigned"}
      </td>

      <td className={cellClassName}>
        <button
          onClick={() => onEdit(record)}
          className="border-border text-foreground hover:bg-muted rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200"
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default memo(StudentRecordsTableRow);
