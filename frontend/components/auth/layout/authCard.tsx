interface Props {
  children: React.ReactNode;
}

export default function AuthCard({ children }: Props) {
  return (
    <div
      className="
        relative
        z-10
        w-full
        max-w-md
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        p-8
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
      "
    >
      {children}
    </div>
  );
}
