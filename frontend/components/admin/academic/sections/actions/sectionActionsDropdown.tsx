import { memo, useCallback } from "react";

import SectionDropdownItem from "./sectionDropdownItem";

interface Props {
  isArchived?: boolean;

  onEdit: () => void;

  onArchive: () => void;

  onRestore: () => void;

  onClose: () => void;
}

function SectionActionsDropdown({
  isArchived,
  onEdit,
  onArchive,
  onRestore,
  onClose,
}: Props) {
  const handleAction = useCallback(
    (e: React.MouseEvent, action: () => void) => {
      e.preventDefault();

      e.stopPropagation();

      action();

      onClose();
    },
    [onClose]
  );

  return (
    <div className="border-border bg-popover absolute top-12 right-0 z-50 w-48 rounded-xl border p-2 shadow-lg">
      {!isArchived ? (
        <>
          <SectionDropdownItem
            label="Edit Section"
            onClick={(e) => handleAction(e, onEdit)}
          />

          <SectionDropdownItem
            label="Archive Section"
            danger
            onClick={(e) => handleAction(e, onArchive)}
          />
        </>
      ) : (
        <SectionDropdownItem
          label="Restore Section"
          onClick={(e) => handleAction(e, onRestore)}
        />
      )}
    </div>
  );
}

export default memo(SectionActionsDropdown);
