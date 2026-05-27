interface Props {
  facultyName?: string;
}

export default function SubjectCardFaculty({
  facultyName,
}: Props) {
  return (
    <div
      className="
        mt-6
        rounded-xl
        bg-muted
        p-4
      "
    >
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-muted-foreground
        "
      >
        Assigned Faculty
      </p>

      <p
        className="
          mt-2
          text-sm
          font-medium
          text-foreground
        "
      >
        {facultyName || "No faculty assigned"}
      </p>
    </div>
  );
}
