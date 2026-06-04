interface Props {
  facultyName?: string;
}

export default function SubjectCardFaculty({
  facultyName,
}: Props) {
  return (
    <div className="bg-muted mt-6 rounded-xl p-4">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Assigned Faculty
      </p>

      <p className="text-foreground mt-2 text-sm font-medium">
        {facultyName || "No faculty assigned"}
      </p>
    </div>
  );
}
