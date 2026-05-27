"use client";

import { useState } from "react";

import {
  MoreVertical,
  Pencil,
  Archive,
} from "lucide-react";

import { confirmDialog } from "@/lib/swal";

interface Props {
  onEdit: () => void;

  onArchive: () => void;
}

export default function SectionCardActions({
  onEdit,

  onArchive,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleArchive = async () => {
    const result = await confirmDialog({
      title: "Archive Section?",
      text: "This section will be hidden from active academic monitoring.",

      confirmText: "Archive",
    });

    if (result.isConfirmed) {
      onArchive();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();

          e.stopPropagation();

          setOpen(!open);
        }}
        className="
          rounded-lg
          p-2
          transition
          hover:bg-muted
        "
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-12
            z-50
            w-48
            rounded-xl
            border
            border-border
            bg-popover
            p-2
            shadow-lg
          "
        >
          <button
            onClick={(e) => {
              e.preventDefault();

              e.stopPropagation();

              onEdit();

              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              transition
              hover:bg-muted
            "
          >
            <Pencil size={16} />
            Edit Section
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();

              e.stopPropagation();

              handleArchive();

              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <Archive size={16} />
            Archive Section
          </button>
        </div>
      )}
    </div>
  );
}
