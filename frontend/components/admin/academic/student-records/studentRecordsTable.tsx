interface StudentRecord {
  id: number;

  studentId: string;

  fullName: string;

  program: string;

  section?: {
    name: string;
  } | null;
}

interface Props {
  records: StudentRecord[];
}

export default function StudentRecordsTable({
  records,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
      "
    >
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Student ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Full Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Program
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Section
            </th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className="
                border-t
                border-slate-100
              "
            >
              <td className="px-6 py-4 text-sm text-slate-700">
                {record.studentId}
              </td>

              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {record.fullName}
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                {record.program}
              </td>

              <td className="px-6 py-4 text-sm text-slate-700">
                {record.section?.name || "Unassigned"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
