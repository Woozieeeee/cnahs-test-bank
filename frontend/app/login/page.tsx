"use client";

import useGuestGuard from "@/hooks/useGuestGuard";

import AuthLayout from "@/components/auth/layout/authLayout";

import AuthCard from "@/components/auth/layout/authCard";

import LoginForm from "@/components/auth/login/loginForm";

export default function LoginPage() {
  const { loading } = useGuestGuard();

  if (loading) {
    return null;
  }

  return (
    <AuthLayout>
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}
