"use client";

import AnimatedPage from "@/components/common/animatedPage";

import RegisterForm from "@/components/auth/register/registerForm";

import useGuestGuard from "@/hooks/useGuestGuard";

export default function RegisterPage() {
  const { loading } = useGuestGuard();

  if (loading) {
    return null;
  }

  return (
    <AnimatedPage>
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
        "
      >
        <RegisterForm />
      </div>
    </AnimatedPage>
  );
}
