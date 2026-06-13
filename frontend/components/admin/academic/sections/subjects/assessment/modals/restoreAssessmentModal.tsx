"use client";

import { memo, useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  assessmentTitle: string;
  onClose: () => void;
  onSubmit: (newDateTime: string) => void;
  isLoading?: boolean;
}

function RestoreAssessmentModal({
  isOpen,
  assessmentTitle,
  onClose,
  onSubmit,
  isLoading = false,
}: Props) {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("09:00");
  const [error, setError] = useState<string>("");

  // Initialize with tomorrow's date
  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split("T")[0];
      setDate(formattedDate);
      setTime("09:00");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      setError("Please select a date");
      return;
    }

    if (!time) {
      setError("Please select a time");
      return;
    }

    // Validate that the selected date/time is in the future
    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime <= new Date()) {
      setError(
        "Please select a date and time in the future"
      );
      return;
    }

    const newDateTime = `${date}T${time}:00`;
    onSubmit(newDateTime);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border-border rounded-lg border p-6 w-full max-w-md shadow-lg">
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-foreground text-lg font-semibold">
            Restore Assessment
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {assessmentTitle}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* DATE INPUT */}
          <div>
            <label className="text-foreground text-sm font-medium block mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError("");
              }}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          {/* TIME INPUT */}
          <div>
            <label className="text-foreground text-sm font-medium block mb-2">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                setError("");
              }}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm">
              {error}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-2 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-border rounded-md text-foreground text-sm font-medium hover:bg-muted disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Restoring..." : "Restore"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(RestoreAssessmentModal);
