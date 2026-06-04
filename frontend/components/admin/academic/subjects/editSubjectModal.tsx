"use client";

import { memo, useCallback, useState } from "react";

import MotionModal from "@/components/motion/motionModal";

import ModalHeader from "@/components/common/modal/modalHeader";

import ModalActions from "@/components/common/modal/modalActions";

interface Subject {
  id: number;

  name: string;

  code: string;

  description?: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  subject: Subject | null;

  onSave: (data: {
    name: string;

    code: string;

    description?: string;
  }) => void;
}

const fieldClassName = `
  w-full
  rounded-xl
  border
  border-input
  bg-background
  px-4
  py-3
  text-foreground

  outline-none

  transition-all
  duration-200

  focus:border-ring
`;

function EditSubjectModal({
  open,
  onOpenChange,
  subject,
  onSave,
}: Props) {
  const [name, setName] = useState("");

  const [code, setCode] = useState("");

  const [description, setDescription] = useState("");

  // =========================
  // CLOSE
  // =========================

  const handleClose = useCallback(() => {
    if (subject) {
      setName(subject.name);
      setCode(subject.code);
      setDescription(subject.description || "");
    }

    onOpenChange(false);
  }, [onOpenChange, subject]);

  // =========================
  // SAVE
  // =========================

  const handleSave = useCallback(() => {
    const trimmedName = name.trim();

    const trimmedCode = code.trim();

    if (!trimmedName || !trimmedCode) {
      return;
    }

    onSave({
      name: trimmedName,

      code: trimmedCode,

      description: description.trim(),
    });

    handleClose();
  }, [name, code, description, onSave, handleClose]);

  if (!open || !subject) {
    return null;
  }

  return (
    <MotionModal open={open} maxWidth="max-w-2xl" contentClassName="max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <ModalHeader
          title="Edit Subject"
          description="Update subject information."
          onClose={handleClose}
        />

        {/* FORM */}

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Subject Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClassName}
          />

          <input
            type="text"
            placeholder="NCM101"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.toUpperCase())
            }
            maxLength={10}
            className={fieldClassName}
          />

          <textarea
            placeholder="Description..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={fieldClassName}
          />
        </div>

        <ModalActions
          submitLabel="Save Changes"
          submitDisabled={!name.trim() || !code.trim()}
          onCancel={handleClose}
          onSubmit={handleSave}
        />
      </div>
    </MotionModal>
  );
}

export default memo(EditSubjectModal);
