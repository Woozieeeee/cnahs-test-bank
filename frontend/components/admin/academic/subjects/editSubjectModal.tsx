"use client";

import { useEffect, useState } from "react";

import MotionModal from "@/components/motion/motionModal";

import MotionButton from "@/components/motion/motionButton";

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

export default function EditSubjectModal({
  open,
  onOpenChange,
  subject,
  onSave,
}: Props) {
  const [name, setName] = useState("");

  const [code, setCode] = useState("");

  const [description, setDescription] = useState("");

  // =========================
  // PREFILL
  // =========================

  useEffect(() => {
    if (!subject) return;

    setName(subject.name);

    setCode(subject.code);

    setDescription(subject.description || "");
  }, [subject]);

  if (!open || !subject) return null;

  return (
    <MotionModal open={open}>
      <div className="p-6">
        {/* HEADER */}

        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-foreground
            "
          >
            Edit Subject
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            Update subject information.
          </p>
        </div>

        {/* FORM */}

        <div className="mt-6 space-y-4">
          {/* NAME */}

          <input
            type="text"
            placeholder="Subject Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-input
              bg-background
              px-4
              py-3
              text-foreground
              outline-none
              transition
              focus:border-ring
            "
          />

          {/* CODE */}

          <input
            type="text"
            placeholder="NCM101"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.toUpperCase())
            }
            className="
              w-full
              rounded-xl
              border
              border-input
              bg-background
              px-4
              py-3
              text-foreground
              outline-none
              transition
              focus:border-ring
            "
          />

          {/* DESCRIPTION */}

          <textarea
            placeholder="Description..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-input
              bg-background
              px-4
              py-3
              text-foreground
              outline-none
              transition
              focus:border-ring
            "
          />
        </div>

        {/* ACTIONS */}

        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >
          <MotionButton
            onClick={() => onOpenChange(false)}
            className="
              rounded-xl
              border
              border-border
              bg-card
              px-4
              py-2
              text-sm
              font-medium
              text-muted-foreground
            "
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={() => {
              onSave({
                name,
                code,
                description,
              });

              onOpenChange(false);
            }}
            className="
              rounded-xl
              bg-primary
              px-4
              py-2
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:bg-primary/90
            "
          >
            Save Changes
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
