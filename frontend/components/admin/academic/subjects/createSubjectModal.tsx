"use client";

import { useState } from "react";

import MotionModal from "@/components/motion/motionModal";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onCreate: (data: {
    name: string;

    code: string;

    description: string;
  }) => void;
}

export default function CreateSubjectModal({
  open,
  onOpenChange,
  onCreate,
}: Props) {
  const [name, setName] = useState("");

  const [code, setCode] = useState("");

  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!name || !code) return;

    onCreate({
      name,
      code,
      description,
    });

    setName("");

    setCode("");

    setDescription("");

    onOpenChange(false);
  };

  return (
    <MotionModal open={open}>
      <div className="p-6">
        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-foreground
              "
            >
              Create Subject
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              Create a new academic subject.
            </p>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="
              rounded-lg
              px-3
              py-1
              text-muted-foreground
              transition
              hover:bg-muted
            "
          >
            ✕
          </button>
        </div>

        {/* FORM */}

        <div className="mt-6 space-y-4">
          {/* SUBJECT NAME */}

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

          {/* SUBJECT CODE */}

          <input
            type="text"
            placeholder="NCM101"
            value={code}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();

              setCode(value);
            }}
            maxLength={10}
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
            placeholder="Subject description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
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
            onClick={handleSubmit}
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
            Create Subject
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
