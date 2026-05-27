import SubjectDropdownItem from "./subjectDropdownItem";

interface Props {
  hasFacultyAssigned: boolean;

  hasSectionsAssigned: boolean;

  isArchived?: boolean;

  onEdit: () => void;

  onAssignFaculty: () => void;

  onUnassignFaculty: () => void;

  onAssignSections: () => void;

  onUnassignSections: () => void;

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

export default function SubjectActionsDropdown({
  hasFacultyAssigned,

  hasSectionsAssigned,

  isArchived,

  onEdit,

  onAssignFaculty,

  onUnassignFaculty,

  onAssignSections,

  onUnassignSections,

  onArchive,

  onRestore,

  onConfirmAction,

  onClose,
}: Props) {
  return (
    <div
      className="
        absolute
        right-0
        z-50
        mt-2
        w-52
        rounded-xl
        border
        border-border
        bg-card
        p-2
        shadow-lg
      "
    >
      {!isArchived && (
        <>
          <SubjectDropdownItem
            label="Edit Subject"
            onClick={() => {
              onEdit();

              onClose();
            }}
          />

          {hasFacultyAssigned ? (
            <SubjectDropdownItem
              label="Unassign Faculty"
              danger
              onClick={() =>
                onConfirmAction({
                  title: "Remove Faculty Assignment?",

                  text: "This will remove the assigned faculty from this subject.",

                  confirmText: "Remove Faculty",

                  action: onUnassignFaculty,
                })
              }
            />
          ) : (
            <SubjectDropdownItem
              label="Assign Faculty"
              onClick={() => {
                onAssignFaculty();

                onClose();
              }}
            />
          )}

          {hasSectionsAssigned ? (
            <SubjectDropdownItem
              label="Unassign Sections"
              danger
              onClick={() =>
                onConfirmAction({
                  title: "Remove Section Assignments?",

                  text: "This will remove all assigned sections from this subject.",

                  confirmText: "Remove Sections",

                  action: onUnassignSections,
                })
              }
            />
          ) : (
            <SubjectDropdownItem
              label="Assign Sections"
              onClick={() => {
                onAssignSections();

                onClose();
              }}
            />
          )}
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
