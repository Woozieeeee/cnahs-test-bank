"use client";

import useGuestGuard from "@/hooks/useGuestGuard";

import AuthLayout from "@/components/auth/layout/authLayout";

import AuthCard from "@/components/auth/layout/authCard";

import RegisterForm from "@/components/auth/register/registerForm";

export default function RegisterPage() {
  const { loading } = useGuestGuard();

  if (loading) {
    return null;
  }

  return (
    <AuthLayout>
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}
