"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import SubjectDropdownItem from "./actions/subjectDropdownItem";
import SubjectActionsDropdown from "./actions/subjectActionsDropdown";
import {
  archiveSubject,
  restoreSubject,
} from "@/services/academic_service";

import {
  confirmDialog,
  successToast,
  errorToast,
} from "@/lib/swal";

interface Props {
  hasFacultyAssigned: boolean;
  hasSectionsAssigned: boolean;
  onEdit: () => void;
  onAssignFaculty: () => void;
  onUnassignFaculty: () => void;
  onAssignSections: () => void;
  onUnassignSections: () => void;
  subjectId: number;
  isArchived?: boolean;
  onRefresh: () => void;
}

export default function SubjectCardActions({
  hasFacultyAssigned,
  hasSectionsAssigned,
  onEdit,
  onAssignFaculty,
  onUnassignFaculty,
  onAssignSections,
  onUnassignSections,
  subjectId,
  isArchived,
  onRefresh,
}: Props) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleArchive = async () => {
    const result = await confirmDialog({
      title: "Archive Subject?",
      text: "This subject will be moved to archived subjects.",
      confirmText: "Archive",
    });

    if (!result.isConfirmed) return;

    try {
      await archiveSubject(subjectId);

      successToast("Subject archived successfully.");

      onRefresh();
    } catch (error) {
      console.error(error);

      errorToast("Failed to archive subject.");
    }
  };

  const handleRestore = async () => {
    const result = await confirmDialog({
      title: "Restore Subject?",
      text: "This subject will become active again.",
      confirmText: "Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await restoreSubject(subjectId);

      successToast("Subject restored successfully.");

      onRefresh();
    } catch (error) {
      console.error(error);

      errorToast("Failed to restore subject.");
    }
  };

  // =========================
  // OUTSIDE CLICK
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
  // HANDLE ACTION
  // =========================

  const handleConfirmAction = async ({
    title,
    text,
    confirmText,
    action,
  }: {
    title: string;

    text: string;

    confirmText: string;

    action: () => void;
  }) => {
    const result = await confirmDialog({
      title,
      text,
      confirmText,
    });

    if (result.isConfirmed) {
      action();

      setOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* TRIGGER */}

      <button
        onClick={() => setOpen(!open)}
        className="
          rounded-lg
          p-2
          text-muted-foreground
          transition
          hover:bg-muted
          hover:text-foreground
        "
      >
        <MoreVertical size={18} />
      </button>

      {/* DROPDOWN */}

      {open && (
        <SubjectActionsDropdown
          hasFacultyAssigned={hasFacultyAssigned}
          hasSectionsAssigned={hasSectionsAssigned}
          isArchived={isArchived}
          onEdit={onEdit}
          onAssignFaculty={onAssignFaculty}
          onUnassignFaculty={onUnassignFaculty}
          onAssignSections={onAssignSections}
          onUnassignSections={onUnassignSections}
          onArchive={handleArchive}
          onRestore={handleRestore}
          onConfirmAction={handleConfirmAction}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
