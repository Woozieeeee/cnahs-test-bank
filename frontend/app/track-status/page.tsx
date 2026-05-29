"use client";

import AuthLayout from "@/components/auth/layout/authLayout";

import AuthCard from "@/components/auth/layout/authCard";

import TrackStatusForm from "@/components/auth/track-status/trackStatusForm";

export default function TrackStatusPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <TrackStatusForm />
      </AuthCard>
    </AuthLayout>
  );
}
