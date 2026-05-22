"use client";

import { useState } from "react";
import { registerUser } from "../../services/auth_service";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] =
    useState("");

  const [studentId, setStudentId] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const studentIdRegex =
  /^\d{2}-\d{5}$/;

  const isStudentIdValid =
  studentId === "" ||
  studentIdRegex.test(studentId);

  const handleStudentIdChange = (
    value: string
  ) => {
    const filteredValue = value.replace(
      /[^0-9-]/g,
      ""
    );

    if (filteredValue.length <= 8) {
      setStudentId(filteredValue);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!isStudentIdValid) {
  alert(
    "Student ID format must be nn-nnnnn"
  );

  return;
}

    try {
      const payload = {
        name,
        studentId,
        password,
      };

      const data =
        await registerUser(payload);

      console.log(data);

      alert("Registered successfully");
    } catch (error) {
      console.log(error);

      alert("Registration failed");
    }
  };

  return (
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
          onChange={(e) =>
            setName(e.target.value)
          }
          className="mb-4 w-full rounded border p-3"
          required
        />

         <div className="mb-4">
  <input
    type="text"
    placeholder="Student ID (22-03213)"
    value={studentId}
    onChange={(e) =>
      handleStudentIdChange(
        e.target.value
      )
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="mb-4 w-full rounded border p-3"
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-black p-3 text-white"
        >
          Register
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
  );
}