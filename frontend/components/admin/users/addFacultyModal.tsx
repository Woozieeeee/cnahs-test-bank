"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";

import PasswordInput from "@/components/common/passwordInput";

import PasswordRules from "@/components/auth/passwordRules";

import PasswordMatchIndicator from "@/components/auth/passwordMatchIndicator";

import { errorToast, successToast } from "@/lib/swal";

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
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
          "Failed to create faculty."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Faculty</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* NAME */}

          <Input
            placeholder="Faculty Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* USERNAME */}

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* PASSWORD */}

          <div>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="Password"
            />

            <PasswordRules
              hasMinLength={hasMinLength}
              hasUppercase={hasUppercase}
              hasLowercase={hasLowercase}
              hasNumber={hasNumber}
              hasSymbol={hasSymbol}
            />
          </div>

          {/* CONFIRM PASSWORD */}

          <div>
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm Password"
            />

            <PasswordMatchIndicator
              visible={!!confirmPassword}
              match={passwordsMatch}
            />
          </div>

          {/* SUBMIT */}

          <Button
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
            "
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && (
              <Loader2 size={18} className="animate-spin" />
            )}

            {loading ? "Creating..." : "Create Faculty"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
