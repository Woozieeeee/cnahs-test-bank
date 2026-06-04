import { memo } from "react";

interface Props {
  children: React.ReactNode;

  onClick?: () => void;

  variant?: "default" | "warning" | "danger";

  className?: string;
}

function ActionButton({
  children,
  onClick,
  variant = "default",
  className = "",
}: Props) {
  const variants = {
    default: `
      border-border
      bg-card
      text-foreground
      hover:bg-muted
    `,

    warning: `
      border-amber-200
      bg-amber-50
      text-amber-700
      hover:bg-amber-100
    `,

    danger: `
      border-red-600
      bg-red-600
      text-white
      hover:bg-red-700
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${variants[variant]} ${className} `}
    >
      {children}
    </button>
  );
}

export default memo(ActionButton);
