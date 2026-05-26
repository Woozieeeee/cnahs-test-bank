"use client";

import AnimatedPage from "@/components/common/animatedPage";

import LoginForm from "@/components/auth/login/loginForm";

import useGuestGuard from "@/hooks/useGuestGuard";

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </AnimatedPage>
  );
}
