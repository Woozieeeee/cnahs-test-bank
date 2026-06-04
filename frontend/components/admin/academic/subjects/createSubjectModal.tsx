"use client";

import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import MotionModal from "@/components/motion/motionModal";

import ModalHeader from "@/components/common/modal/modalHeader";

import ModalActions from "@/components/common/modal/modalActions";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onCreate: (data: {
    name: string;

    code: string;

    description: string;
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

function CreateSubjectModal({
  open,
  onOpenChange,
  onCreate,
}: Props) {
  const [name, setName] = useState("");

  const [code, setCode] = useState("");

  const [description, setDescription] = useState("");

  // =========================
  // RESET
  // =========================

  const resetForm = useCallback(() => {
    setName("");

    setCode("");

    setDescription("");
  }, []);

  // =========================
  // RESET ON CLOSE
  // =========================

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  // =========================
  // CLOSE
  // =========================

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = useCallback(() => {
    const trimmedName = name.trim();

    const trimmedCode = code.trim();

    if (!trimmedName || !trimmedCode) {
      return;
    }

    onCreate({
      name: trimmedName,

      code: trimmedCode,

      description: description.trim(),
    });

    handleClose();
  }, [name, code, description, onCreate, handleClose]);

  if (!open) return null;

  return (
    <MotionModal open={open}>
      <div className="p-6">
        <ModalHeader
          title="Create Subject"
          description="Create a new academic subject."
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
            placeholder="Subject description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={fieldClassName}
          />
        </div>

        <ModalActions
          submitLabel="Create Subject"
          submitDisabled={!name.trim() || !code.trim()}
          onCancel={handleClose}
          onSubmit={handleSubmit}
        />
      </div>
    </MotionModal>
  );
}

export default memo(CreateSubjectModal);
