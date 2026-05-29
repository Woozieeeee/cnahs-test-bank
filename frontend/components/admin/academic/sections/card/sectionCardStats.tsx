import type { Section } from "@/types/section";

interface Props {
  section: Section;
}

export default function SectionCardStats({
  section,
}: Props) {
  return (
    <div
      className="
        mt-6
        grid
        grid-cols-2
        gap-4
      "
    >
      {/* STUDENTS */}

      <div
        className="
          rounded-xl
          bg-muted
          p-4
        "
      >
        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          Students
        </p>

        <p
          className="
            mt-2
            text-2xl
            font-bold
            text-foreground
          "
        >
          {section.users.length}
        </p>
      </div>

      {/* EXAMS */}

      <div
        className="
          rounded-xl
          bg-muted
          p-4
        "
      >
        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          Exams
        </p>

        <p
          className="
            mt-2
            text-2xl
            font-bold
            text-foreground
          "
        >
          {section.exams.length}
        </p>
      </div>
    </div>
  );
}
