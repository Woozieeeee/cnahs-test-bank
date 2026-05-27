import MotionButton from "@/components/motion/motionButton";
import SortableTableHeader from "@/components/common/sortableTableHeader";

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
  records: StudentRecord[];
  onEdit: (record: StudentRecord) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string, order: "asc" | "desc") => void;
}

export default function StudentRecordsTable({
  records,
  sortField,
  sortOrder,
  onSort,
  onEdit,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
      "
    >
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <SortableTableHeader
              label="Student ID"
              field="studentId"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={onSort}
            />

            <SortableTableHeader
              label="Full Name"
              field="lastName"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={onSort}
            />

            <SortableTableHeader
              label="Program"
              field="program"
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={onSort}
            />

            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
              Section
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="
                  px-6
                  py-10
                  text-center
                  align-middle
                  text-sm
                  text-muted-foreground
                "
              >
                No student records found.
              </td>
            </tr>
          )}
          {records.map((record) => (
            <tr
              key={record.id}
              className="
                border-t
                border-border
              "
            >
              <td className="px-6 py-4 text-sm text-foreground">
                {record.studentId}
              </td>

              <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                {[
                  record.lastName + ",",
                  record.firstName,
                  record.middleName,
                  record.suffix,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </td>

              <td className="px-6 py-4 text-sm text-foreground">
                {record.program}
              </td>

              <td className="px-6 py-4 text-sm text-foreground">
                {record.section?.name || "Unassigned"}
              </td>

              <td className="px-6 py-4">
                <MotionButton
                  onClick={() => onEdit(record)}
                  className="
                  rounded-lg
                  border
                  border-border
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-foreground
                  transition
                  hover:bg-muted
                  cursor-pointer
                "
                >
                  Edit
                </MotionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
