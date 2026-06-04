"use client";

import { useState } from "react";

import ModalHeader from "@/components/common/modal/modalHeader";
import ModalActions from "@/components/common/modal/modalActions";

import { successToast, errorToast } from "@/lib/swal";

import { createFacultyTopic } from "@/services/faculty_service";

interface Props {
  open: boolean;

  onClose: () => void;

  subjectId: number;

  onSuccess: () => void;
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

      await createFacultyTopic(subjectId, {
        name,
        description,
      });

      successToast("Topic created successfully.");

      setName("");

      setDescription("");

      onSuccess();

      onClose();
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Failed to create topic."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card border-border w-full max-w-lg rounded-2xl border p-6">
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
    </div>
  );
}
