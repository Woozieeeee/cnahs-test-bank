"use client";

import MotionPage from "@/components/motion/motionPage";

import AuthBackground from "./authBackground";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <MotionPage>
      <div
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-slate-50
          px-4
        "
      >
        <AuthBackground />

        {children}
      </div>
    </MotionPage>
  );
}
