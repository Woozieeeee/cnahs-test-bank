"use client";

import { useState } from "react";
import { registerUser } from "../../services/auth_service";
import {
  successToast,
  errorToast,
  infoToast,
} from "@/lib/swal";
import Link from "next/link";
import AnimatedPage from "@/components/common/animatedPage";
import PasswordInput from "@/components/common/passwordInput";
import { Loader2 } from "lucide-react";
import PasswordRules from "@/components/auth/passwordRules";
import PasswordMatchIndicator from "@/components/auth/passwordMatchIndicator";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [loading, setLoading] = useState(false);
  const studentIdRegex = /^\d{2}-\d{5}$/;

  const isStudentIdValid =
    studentId === "" || studentIdRegex.test(studentId);

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

  const handleStudentIdChange = (value: string) => {
    const filteredValue = value.replace(/[^0-9-]/g, "");

    if (filteredValue.length <= 8) {
      setStudentId(filteredValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStudentIdValid) {
      alert("Student ID format must be nn-nnnnn");

      return;
    }

    if (!isPasswordStrong) {
      errorToast("Please create a stronger password.");

      return;
    }

    if (password !== confirmPassword) {
      errorToast("Passwords do not match.");

      return;
    }

    setLoading(true);

    try {
      const payload = {
        name,
        studentId,
        password,
      };

      const data = await registerUser(payload);

      console.log(data);

      await successToast(
        "Registration Submitted, /n Your account is now waiting for administrator approval."
      );
    } catch (error: any) {
      console.log(error);

      console.log(error.response);

      const message = error.response?.data?.message;

      // =========================
      // STUDENT ALREADY EXISTS
      // =========================

      if (message === "Student already exists") {
        errorToast(
          "Registration Failed /n This Student ID is already registered."
        );

        return;
      }

      // =========================
      // DEFAULT ERROR
      // =========================

      errorToast(
        message ||
          "Registration failed /n Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg border p-6 shadow"
        >
          <p className="mb-4 text-sm text-gray-500">
            Student Registration
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded border p-3"
            required
          />

          <div className="mb-4">
            <input
              type="text"
              placeholder="Student ID (22-03213)"
              value={studentId}
              onChange={(e) =>
                handleStudentIdChange(e.target.value)
              }
              className={`w-full rounded border p-3 ${
                studentId.length === 8 &&
                !studentIdRegex.test(studentId)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              required
            />

            {studentId.length === 8 &&
              !studentIdRegex.test(studentId) && (
                <p className="mt-1 text-sm text-red-500">
                  Format must be nn-nnnnn
                </p>
              )}
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
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

          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded
              bg-black
              p-3
              text-white
              transition
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading && (
              <Loader2 size={18} className="animate-spin" />
            )}

            {loading ? "Registering..." : "Register"}
          </button>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:underline"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </AnimatedPage>
  );
  function PasswordRule({
    valid,

    label,
  }: {
    valid: boolean;

    label: string;
  }) {
    return (
      <p
        className={`flex items-center gap-2 ${
          valid ? "text-emerald-600" : "text-slate-400"
        }`}
      >
        <span>{valid ? "✓" : "•"}</span>

        <span>{label}</span>
      </p>
    );
  }
}
