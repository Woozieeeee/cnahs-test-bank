"use client";

import { useState } from "react";

import MotionDropdown from "@/components/motion/motionDropdown";
import MotionButton from "@/components/motion/motionButton";

import { MoreVertical } from "lucide-react";

import { FacultyTopic } from "@/types/faculty/facultyTopic";

interface Props {
  topic: FacultyTopic;

  onEdit: () => void;

  onArchive: () => void;

  onRestore: () => void;
}

export default function FacultyTopicCardDropdown({
  topic,
  onEdit,
  onArchive,
  onRestore,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <MotionButton
        onClick={() => setOpen(!open)}
        className="hover:bg-muted rounded-lg p-2"
      >
        <MoreVertical size={18} />
      </MotionButton>

      {open && (
        <MotionDropdown className="border-border bg-popover absolute right-0 z-50 mt-2 w-48 rounded-xl border p-2 shadow-lg">
          <MotionButton
            onClick={() => {
              setOpen(false);

              onEdit();
            }}
            className="hover:bg-muted w-full rounded-lg px-3 py-2 text-left"
          >
            Edit Topic
          </MotionButton>

          {topic.isArchived ? (
            <MotionButton
              onClick={() => {
                setOpen(false);

                onRestore();
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-green-600 hover:bg-green-500/10"
            >
              Restore Topic
            </MotionButton>
          ) : (
            <MotionButton
              onClick={() => {
                setOpen(false);

                onArchive();
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-red-500 hover:bg-red-500/10"
            >
              Archive Topic
            </MotionButton>
          )}
        </MotionDropdown>
      )}
    </div>
  );
}
