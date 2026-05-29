"use client";

import AuthLayout from "@/components/auth/layout/authLayout";

import AuthCard from "@/components/auth/layout/authCard";

import ChangePasswordForm from "@/components/auth/change-password/changePasswordForm";

export default function ChangePasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <ChangePasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}
