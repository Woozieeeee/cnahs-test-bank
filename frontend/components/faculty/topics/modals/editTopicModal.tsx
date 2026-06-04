"use client";

import { useEffect, useState } from "react";

import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";

import { successToast, errorToast } from "@/lib/swal";

import { updateFacultyTopic } from "@/services/faculty_service";

import type { FacultyTopic } from "@/types/facultyTopic";

interface Props {
  open: boolean;

  onClose: () => void;

  onSuccess: () => void;

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

      await updateFacultyTopic(topic.id, {
        name,
        description,
      });

      successToast("Topic updated successfully.");

      onSuccess();

      onClose();
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card border-border w-full max-w-lg rounded-2xl border p-6">
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
    </div>
  );
}
