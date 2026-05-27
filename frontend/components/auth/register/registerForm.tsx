"use client";

import { useState } from "react";

import { successToast, errorToast } from "@/lib/swal";

import { registerUser } from "@/services/auth_service";

import PasswordInput from "@/components/common/passwordInput";

import PasswordRules from "@/components/auth/shared/passwordRules";

import PasswordMatchIndicator from "@/components/auth/shared/passwordMatchIndicator";

import RegisterHeader from "./registerHeader";

import RegisterLinks from "./registerLinks";

import StudentIdField from "../shared/studentIdField";

export default function RegisterForm() {
  const [studentId, setStudentId] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // PASSWORD VALIDATION
  // =========================

  const hasMinLength = password.length >= 8;

  const hasUppercase = /[A-Z]/.test(password);

  const hasLowercase = /[a-z]/.test(password);

  const hasNumber = /\d/.test(password);

  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const passwordsMatch = password === confirmPassword;

  const handleStudentIdChange = (value: string) => {
    const filteredValue = value.replace(/[^0-9-]/g, "");

    if (filteredValue.length <= 8) {
      setStudentId(filteredValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch) {
      errorToast("Passwords do not match.");

      return;
    }

    try {
      setLoading(true);

      await registerUser({
        studentId,
        password,
      });

      successToast("Registration submitted successfully.");

      setStudentId("");

      setPassword("");

      setConfirmPassword("");
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        max-w-md
        rounded-lg
        border
        p-6
        shadow
      "
    >
      <RegisterHeader />

      {/* STUDENT ID */}

      <StudentIdField
        studentId={studentId}
        onChange={handleStudentIdChange}
      />

      {/* PASSWORD */}

      <div className="mb-4 ">
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Password"
          className="
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          outline-none
          transition
          focus:border-slate-500"
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

      <div className="mb-4">
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm Password"
          className="
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          outline-none
          transition
          focus:border-slate-500"
        />

        <PasswordMatchIndicator
          visible={confirmPassword.length > 0}
          match={passwordsMatch}
        />
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded
          bg-black
          p-3
          text-white
          transition
          hover:bg-slate-800
          disabled:opacity-70
        "
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <RegisterLinks />
    </form>
  );
}
