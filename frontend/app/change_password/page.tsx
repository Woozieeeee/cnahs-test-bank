"use client";

import AnimatedPage from "@/components/common/animatedPage";

import ChangePasswordForm from "@/components/auth/change-password/changePasswordForm";

export default function ChangePasswordPage() {
  return (
    <AnimatedPage>
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-50
          px-4
        "
      >
        <ChangePasswordForm />
      </div>
    </AnimatedPage>
  );
}
