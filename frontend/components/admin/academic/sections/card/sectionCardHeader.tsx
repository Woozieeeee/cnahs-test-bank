import SectionCardActions from "../sectionCardActions";

import type { Section } from "@/types/section";

interface Props {
  section: Section;

  onRefresh: () => void;
  onEdit: () => void;
}

export default function SectionCardHeader({
  section,
  onRefresh,
  onEdit,
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2
          className="
            text-xl
            font-semibold
            text-foreground
          "
        >
          {section.name}
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-muted-foreground
          "
        >
          {section.program}
        </p>

        {section.isArchived && (
          <span
            className="
              mt-2
              inline-flex
              rounded-full
              border
              border-border
              bg-muted
              px-2
              py-0.5
              text-[10px]
              font-semibold
              uppercase
              tracking-wide
              text-muted-foreground
            "
          >
            Archived
          </span>
        )}
      </div>

      <SectionCardActions
        sectionId={section.id}
        isArchived={section.isArchived}
        onRefresh={onRefresh}
        onEdit={onEdit}
      />
    </div>
  );
}
