import RegistrationStatusBadge from "./registrationStatusBadge";

interface Props {
  student: {
    id: number;

    name: string;

    studentId: string;

    status: string;
  };
}

export default function RegistrationTableRow({
  student,
}: Props) {
  return (
    <tr className="border-b">
      <td className="p-3">{student.name}</td>

      <td className="p-3">{student.studentId}</td>

      <td className="p-3">
        <RegistrationStatusBadge status={student.status} />
      </td>
    </tr>
  );
}
