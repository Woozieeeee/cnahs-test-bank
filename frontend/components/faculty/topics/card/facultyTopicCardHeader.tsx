"use client";

import { FacultyTopic } from "@/types/facultyTopic";

import FacultyTopicCardDropdown from "./facultyTopicCardDropdown";

interface Props {
  topic: FacultyTopic;

  onEdit: () => void;

  onArchive: () => void;

  onRestore: () => void;
}

export default function FacultyTopicCardHeader({
  topic,
  onEdit,
  onArchive,
  onRestore,
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          {topic.name}
        </h2>

        <p
          className={`mt-1 text-sm ${
            topic.isArchived
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          {topic.isArchived ? "Archived" : "Active"}
        </p>
      </div>

      <FacultyTopicCardDropdown
        topic={topic}
        onEdit={onEdit}
        onArchive={onArchive}
        onRestore={onRestore}
      />
    </div>
  );
}
