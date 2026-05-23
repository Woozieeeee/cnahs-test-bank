import RegistrationTableRow from "./registrationTableRow";

interface Registration {
  id: number;

  name: string;

  studentId: string;

  status: string;
}

interface Props {
  registrations: Registration[];
}

export default function RegistrationTable({
  registrations,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              text-left
              text-gray-500
            "
          >
            <th className="p-3">Name</th>

            <th className="p-3">Student ID</th>

            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {registrations.map((student) => (
            <RegistrationTableRow
              key={student.id}
              student={student}
            />
          ))}

          {registrations.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="
                  p-6
                  text-center
                  text-gray-500
                "
              >
                No registrations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
