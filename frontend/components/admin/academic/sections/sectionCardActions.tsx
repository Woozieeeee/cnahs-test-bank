"use client";

import { useEffect, useRef, useState } from "react";

import { MoreVertical } from "lucide-react";

import {
  confirmDialog,
  successToast,
  errorToast,
} from "@/lib/swal";

import {
  archiveSection,
  restoreSection,
} from "@/services/academic_service";

import SectionActionsDropdown from "./actions/sectionActionsDropdown";

interface Props {
  sectionId: number;

  isArchived?: boolean;

  onEdit: () => void;

  onRefresh: () => void;
}

export default function SectionCardActions({
  sectionId,
  isArchived,
  onEdit,
  onRefresh,
}: Props) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // =========================
  // CLOSE OUTSIDE
  // =========================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================
  // ARCHIVE
  // =========================

  const handleArchive = async () => {
    const result = await confirmDialog({
      title: "Archive Section?",
      text: "This section will be hidden from active academic monitoring.",

      confirmText: "Archive",
    });

    if (!result.isConfirmed) return;

    try {
      await archiveSection(sectionId);

      successToast("Section archived successfully.");

      onRefresh();
    } catch (error) {
      console.error(error);

      errorToast("Failed to archive section.");
    }
  };

  // =========================
  // RESTORE
  // =========================

  const handleRestore = async () => {
    try {
      await restoreSection(sectionId);

      successToast("Section restored successfully.");

      onRefresh();
    } catch (error) {
      console.error(error);

      errorToast("Failed to restore section.");
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
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
        <SectionActionsDropdown
          isArchived={isArchived}
          onEdit={onEdit}
          onArchive={handleArchive}
          onRestore={handleRestore}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
