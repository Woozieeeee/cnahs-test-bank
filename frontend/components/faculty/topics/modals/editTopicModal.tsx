"use client";

import { useEffect, useState } from "react";

import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";
import MotionModal from "@/components/motion/motionModal";

import { successToast, errorToast } from "@/lib/swal";

import { updateFacultyTopic } from "@/services/faculty_service";

import type { FacultyTopic } from "@/types/faculty/facultyTopic";

interface Props {
  open: boolean;

  onClose: () => void;

  onSuccess: (topic: FacultyTopic) => void;

  topic: FacultyTopic | null;
}

export default function EditTopicModal({
  open,
  onClose,
  onSuccess,
  topic,
}: Props) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!topic) return;

    setName(topic.name);

    setDescription(topic.description || "");
  }, [topic]);

  const handleSubmit = async () => {
    if (!topic) return;

    try {
      setLoading(true);

      const updatedTopic = await updateFacultyTopic(
        topic.id,
        {
          name,
          description,
        }
      );

      successToast("Topic updated successfully.");

      onSuccess(updatedTopic);

      onClose();
    } catch (error: unknown) {
      const responseError = error as {
        response?: { data?: { message?: string } };
      };

      errorToast(
        responseError.response?.data?.message ||
          "Failed to update topic."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !topic) {
    return null;
  }

  return (
    <MotionModal
      open={open}
      maxWidth="max-w-lg"
      contentClassName="max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6">
        <ModalHeader
          title="Edit Topic"
          description="Update topic information."
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
              className="border-border w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="border-border w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>

        <ModalActions
          submitLabel={
            loading ? "Saving..." : "Save Changes"
          }
          submitDisabled={loading || !name.trim()}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </MotionModal>
  );
}
