"use client";

interface Props {
  title: string | null;
}

export default function DraftAssessmentCardHeader({
  title,
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          {title || "Untitled Draft"}
        </h2>

        <p className="mt-1 text-sm text-amber-600">Draft</p>
      </div>
    </div>
  );
}
