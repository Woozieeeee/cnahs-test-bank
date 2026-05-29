export default function AuthBackground() {
  return (
    <>
      {/* TOP GRADIENT */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[400px]
          bg-gradient-to-b
          from-slate-100
          to-transparent
        "
      />

      {/* LEFT BLUR */}

      <div
        className="
          absolute
          left-[-120px]
          top-[120px]
          h-[320px]
          w-[320px]
          rounded-full
          bg-slate-200/40
          blur-3xl
        "
      />

      {/* RIGHT BLUR */}

      <div
        className="
          absolute
          right-[-120px]
          bottom-[120px]
          h-[320px]
          w-[320px]
          rounded-full
          bg-slate-300/30
          blur-3xl
        "
      />
    </>
  );
}
