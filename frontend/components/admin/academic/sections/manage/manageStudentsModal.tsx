"use client";

import { useState, useEffect } from "react";

import { X } from "lucide-react";

import type { Section } from "@/types/academic/section";

import StudentMultiSelect from "@/components/admin/academic/shared/studentMultiSelect";

import { assignStudentSection, unassignStudentSection } from "@/services/academic_service";

import { successToast, errorToast, confirmDialog } from "@/lib/swal";

interface ManageStudentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: Section | null;
  onSuccess?: () => void;
}

export default function ManageStudentsModal({
  open,
  onOpenChange,
  section,
  onSuccess,
}: ManageStudentsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<"assign" | "unassign" | null>(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange(false);
    setSelectedStudents([]);
    setSelectedType(null);
  };

  const handleSave = async () => {
    if (!section || selectedStudents.length === 0) {
      console.log("Cannot save: missing section or no students selected");
      return;
    }

    console.log("=== STUDENT ASSIGNMENT START ===");
    console.log("Section ID:", section.id);
    console.log("Selected Student IDs:", selectedStudents);
    console.log("Selected Type:", selectedType);

    setIsLoading(true);

    try {
      if (selectedType === "assign") {
        await Promise.all(
          selectedStudents.map((studentId) =>
            assignStudentSection(studentId, section.id)
          )
        );

        successToast(
          `Successfully assigned ${selectedStudents.length} student${
            selectedStudents.length !== 1 ? "s" : ""
          } to ${section.name}`
        );
      }

      if (selectedType === "unassign") {
        const result = await confirmDialog({
          title: "Unassign Students?",
          text: `Remove ${selectedStudents.length} student${
            selectedStudents.length !== 1 ? "s" : ""
          } from ${section.name}?`,
          confirmText: "Unassign",
          destructive: true,
        });

        if (!result.isConfirmed) {
          setIsLoading(false);
          return;
        }

        await Promise.all(
          selectedStudents.map((studentId) =>
            unassignStudentSection(studentId)
          )
        );

        successToast(
          `Successfully unassigned ${selectedStudents.length} student${
            selectedStudents.length !== 1 ? "s" : ""
          } from ${section.name}`
        );
      }

      if (onSuccess) {
        console.log("Calling onSuccess callback to refresh");
        onSuccess();
      }

      handleClose();
    } catch (error) {
      console.error("=== ASSIGNMENT FAILED ===");
      console.error("Error:", error);
      errorToast("Failed to process students. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = selectedType === "unassign" ? "Unassign" : "Assign";
  const studentLabel = selectedStudents.length === 1 ? "Student" : "Students";
  const buttonDisabled = selectedStudents.length === 0 || isLoading;

  if (!isOpen || !section) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card relative w-full max-w-2xl rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Manage Students - {section.name}
          </h2>
          <button
            onClick={handleClose}
            className="hover:bg-muted rounded-lg p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-card border border-blue-200 rounded-lg p-4 text-sm text-foreground">
              <p className="font-medium">📋 Section Information</p>
              <p className="mt-2">
                <strong>Section:</strong> {section.name}
              </p>
              <p>
                <strong>Program:</strong> {section.program}
              </p>
              <p>
                <strong>Year Level:</strong> {section.yearLevel}
              </p>
              <p>
                <strong>Section Code:</strong> {section.sectionCode}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">
                Manage Students
              </h3>
              <StudentMultiSelect
                sectionId={section.id}
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
                onStudentsLoaded={() => {
                  console.log("Students loaded in modal");
                }}
                onSelectedTypeChange={setSelectedType}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-border flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="hover:bg-muted rounded-lg px-4 py-2 transition-colors text-sm font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={buttonDisabled}
            className={`rounded-lg px-4 py-2 text-white text-sm font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedType === "unassign"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Processing...
              </>
            ) : selectedStudents.length > 0 ? (
              <>
                {actionLabel} {selectedStudents.length} {studentLabel}
              </>
            ) : (
              <span>Select Students First</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
