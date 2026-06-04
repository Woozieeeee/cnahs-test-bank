import SectionCardActions from "../sectionCardActions";

import type { Section } from "@/types/section";

interface Props {
  section: Section;

  onArchiveSuccess: (sectionId: number) => void;

  onRestoreSuccess: (sectionId: number) => void;
  onEdit: () => void;
}

export default function SectionCardHeader({
  section,
  onArchiveSuccess,
  onRestoreSuccess,
  onEdit,
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-foreground text-xl font-semibold">
          {section.name}
        </h2>

        <p className="text-muted-foreground mt-1 text-sm">
          {section.program}
        </p>

        {section.isArchived && (
          <span className="border-border bg-muted text-muted-foreground mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
            Archived
          </span>
        )}
      </div>

      <SectionCardActions
        sectionId={section.id}
        isArchived={section.isArchived}
        onArchiveSuccess={onArchiveSuccess}
        onRestoreSuccess={onRestoreSuccess}
        onEdit={onEdit}
      />
    </div>
  );
}
