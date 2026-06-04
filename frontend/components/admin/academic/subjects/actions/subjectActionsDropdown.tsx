import { memo, useCallback } from "react";

import SubjectDropdownItem from "./subjectDropdownItem";

interface Props {
  isArchived?: boolean;

  onEdit: () => void;

  onManageFaculty: () => void;

  onManageSection: () => void;

  onArchive: () => void;

  onRestore: () => void;

  onConfirmAction: (props: {
    title: string;
    text: string;
    confirmText: string;
    action: () => void;
  }) => void;

  onClose: () => void;
}

function SubjectActionsDropdown({
  isArchived,
  onEdit,
  onManageFaculty,
  onManageSection,
  onArchive,
  onRestore,
  onConfirmAction,
  onClose,
}: Props) {
  // =========================
  // HELPERS
  // =========================

  const executeAndClose = useCallback(
    (action: () => void) => {
      action();

      onClose();
    },
    [onClose]
  );

  const handleEdit = useCallback(() => {
    executeAndClose(onEdit);
  }, [executeAndClose, onEdit]);

  const handleManageFaculty = useCallback(() => {
    executeAndClose(onManageFaculty);
  }, [executeAndClose, onManageFaculty]);

  const handleManageSection = useCallback(() => {
    executeAndClose(onManageSection);
  }, [executeAndClose, onManageSection]);

  return (
    <div className="border-border bg-card absolute right-0 z-50 mt-2 w-52 rounded-xl border p-2 shadow-lg">
      {!isArchived && (
        <>
          <SubjectDropdownItem
            label="Edit Subject"
            onClick={handleEdit}
          />

          <SubjectDropdownItem
            label="Manage Faculty Pool"
            onClick={handleManageFaculty}
          />

          <SubjectDropdownItem
            label="Manage Sections"
            onClick={handleManageSection}
          />
        </>
      )}

      {isArchived ? (
        <SubjectDropdownItem
          label="Restore Subject"
          onClick={onRestore}
        />
      ) : (
        <SubjectDropdownItem
          label="Archive Subject"
          danger
          onClick={onArchive}
        />
      )}
    </div>
  );
}

export default memo(SubjectActionsDropdown);
