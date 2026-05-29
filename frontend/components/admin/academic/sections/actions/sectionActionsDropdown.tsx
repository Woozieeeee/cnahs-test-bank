import SectionDropdownItem from "./sectionDropdownItem";

interface Props {
  isArchived?: boolean;

  onEdit: () => void;

  onArchive: () => void;

  onRestore: () => void;

  onClose: () => void;
}

export default function SectionActionsDropdown({
  isArchived,
  onEdit,
  onArchive,
  onRestore,
  onClose,
}: Props) {
  return (
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
      {!isArchived ? (
        <>
          <SectionDropdownItem
            label="Edit Section"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
              onClose();
            }}
          />

          <SectionDropdownItem
            label="Archive Section"
            danger
            onClick={(e) => {
              e.preventDefault();

              e.stopPropagation();

              onArchive();

              onClose();
            }}
          />
        </>
      ) : (
        <SectionDropdownItem
          label="Restore Section"
          onClick={(e) => {
            e.preventDefault();

            e.stopPropagation();

            onRestore();

            onClose();
          }}
        />
      )}
    </div>
  );
}
