"use client";

import { useState } from "react";

import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";
import MotionModal from "@/components/motion/motionModal";

import { successToast, errorToast } from "@/lib/swal";

import { createFacultyTopic } from "@/services/faculty_service";

import type { FacultyTopic } from "@/types/faculty/facultyTopic";

interface Props {
  open: boolean;

  onClose: () => void;

  subjectId: number;

  onSuccess: (topic: FacultyTopic) => void;
}

export default function CreateTopicModal({
  open,
  onClose,
  subjectId,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const createdTopic = await createFacultyTopic(
        subjectId,
        {
          name,
          description,
        }
      );

      successToast("Topic created successfully.");

      setName("");

      setDescription("");

      onSuccess(createdTopic);

      onClose();
    } catch (error: unknown) {
      const responseError = error as {
        response?: { data?: { message?: string } };
      };

      errorToast(
        responseError.response?.data?.message ||
          "Failed to create topic."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <MotionModal
      open={open}
      maxWidth="max-w-lg"
      contentClassName="max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6">
        <ModalHeader
          title="Create Topic"
          description="Create a new topic for organizing questions."
          onClose={onClose}
        />

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Topic Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter topic name"
              className="border-border w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={4}
              placeholder="Optional description"
              className="border-border w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>

        <ModalActions
          submitLabel={
            loading ? "Creating..." : "Create Topic"
          }
          submitDisabled={loading || !name.trim()}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </MotionModal>
  );
}
