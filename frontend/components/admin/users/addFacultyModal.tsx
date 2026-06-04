"use client";

import { useState } from "react";

import MotionButton from "@/components/motion/motionButton";

import MotionModal from "@/components/motion/motionModal";

import FacultyFormFields from "../faculty/facultyFormFields";

import FacultyPasswordFields from "../faculty/facultyPasswordFields";

import { errorToast, successToast } from "@/lib/swal";

import { Loader2 } from "lucide-react";

import { createFaculty } from "@/services/admin_service";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess: () => void;
}

export default function AddFacultyModal({
  open,

  onOpenChange,

  onSuccess,
}: Props) {
  const [name, setName] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // PASSWORD VALIDATION
  // =========================

  const passwordsMatch = password === confirmPassword;

  const hasMinLength = password.length >= 8;

  const hasUppercase = /[A-Z]/.test(password);

  const hasLowercase = /[a-z]/.test(password);

  const hasNumber = /[0-9]/.test(password);

  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const isPasswordStrong =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSymbol;

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    // PASSWORD STRENGTH

    if (!isPasswordStrong) {
      errorToast("Please create a stronger password.");

      return;
    }

    // PASSWORD MATCH

    if (!passwordsMatch) {
      errorToast("Passwords do not match.");

      return;
    }

    try {
      setLoading(true);

      await createFaculty({
        name,

        username,

        password,
      });

      successToast("Faculty created successfully.");

      onSuccess();

      onOpenChange(false);

      // RESET

      setName("");

      setUsername("");

      setPassword("");

      setConfirmPassword("");
    } catch (error: unknown) {
      const responseError = error as {
        response?: { data?: { message?: string } };
      };

      errorToast(
        responseError.response?.data?.message ||
          "Failed to create faculty."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionModal open={open} maxWidth="max-w-4xl" contentClassName="max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-bold">
              Add Faculty
            </h2>

            <p className="text-muted-foreground mt-1 text-sm">
              Create a new faculty account.
            </p>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:bg-muted rounded-lg px-3 py-1 transition"
          >
            ✕
          </button>
        </div>

        {/* FORM */}

        <div className="mt-6 space-y-6">
          <FacultyFormFields
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
          />

          <FacultyPasswordFields
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            hasMinLength={hasMinLength}
            hasUppercase={hasUppercase}
            hasLowercase={hasLowercase}
            hasNumber={hasNumber}
            hasSymbol={hasSymbol}
            passwordsMatch={passwordsMatch}
          />
        </div>

        {/* ACTIONS */}

        <div className="mt-6 flex justify-end gap-3">
          <MotionButton
            onClick={() => onOpenChange(false)}
            className="border-border text-foreground rounded-xl border px-4 py-2 text-sm font-medium"
          >
            Cancel
          </MotionButton>

          <MotionButton
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-70"
          >
            {loading && (
              <Loader2 size={18} className="animate-spin" />
            )}

            {loading ? "Creating..." : "Create Faculty"}
          </MotionButton>
        </div>
      </div>
    </MotionModal>
  );
}
