"use client";

import AnimatedPage from "@/components/common/animatedPage";

import TrackStatusForm from "@/components/auth/track-status/trackStatusForm";

export default function TrackStatusPage() {
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
        <TrackStatusForm />
      </div>
    </AnimatedPage>
  );
}
