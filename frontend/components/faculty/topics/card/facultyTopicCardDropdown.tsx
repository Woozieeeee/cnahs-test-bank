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

  const handleEdit = () => {
    setOpen(false);
    onEdit();
  };

  const handleArchive = () => {
    setOpen(false);
    onArchive();
  };

  const handleRestore = () => {
    setOpen(false);
    onRestore();
  };

  return (
    <MotionDropdown
      className="p-2"
      width="w-48"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <MotionButton className="hover:bg-muted rounded-lg p-2">
          <MoreVertical size={18} />
        </MotionButton>
      }
    >
      <MotionButton
        onClick={handleEdit}
        className="hover:bg-muted w-full rounded-lg px-3 py-2 text-left"
      >
        Edit Topic
      </MotionButton>

      {topic.isArchived ? (
        <MotionButton
          onClick={handleRestore}
          className="w-full rounded-lg px-3 py-2 text-left text-green-600 hover:bg-green-500/10"
        >
          Restore Topic
        </MotionButton>
      ) : (
        <MotionButton
          onClick={handleArchive}
          className="w-full rounded-lg px-3 py-2 text-left text-red-500 hover:bg-red-500/10"
        >
          Archive Topic
        </MotionButton>
      )}
    </MotionDropdown>
  );
}
