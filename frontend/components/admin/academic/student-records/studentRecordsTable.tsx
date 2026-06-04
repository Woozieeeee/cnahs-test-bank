import SortableTableHeader from "@/components/common/sortableTableHeader";

import StudentRecordsTableRow from "./studentRecordsTableRow";

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

const headerClassName = `
  px-6
  py-4
  text-left
  text-sm
  font-semibold
  text-muted-foreground
`;

export default function StudentRecordsTable({
  records,
  sortField,
  sortOrder,
  onSort,
  onEdit,
}: Props) {
  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
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

            <th className={headerClassName}>Section</th>

            <th className={headerClassName}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-muted-foreground px-6 py-10 text-center text-sm"
              >
                No student records found.
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <StudentRecordsTableRow
                key={record.id}
                record={record}
                onEdit={onEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
