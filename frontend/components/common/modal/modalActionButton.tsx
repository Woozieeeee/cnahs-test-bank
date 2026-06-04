import { memo } from "react";

interface Props {
  children: React.ReactNode;

  onClick?: () => void;

  variant?: "default" | "warning" | "danger";
}

function ModalActionButton({
  children,
  onClick,
  variant = "default",
}: Props) {
  const styles = {
    default: `
      bg-primary
      text-primary-foreground
      hover:bg-primary/90
    `,
    warning: `
      border
      border-amber-200
      bg-amber-50
      text-amber-700
      hover:bg-amber-100
    `,
    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${styles[variant]} `}
    >
      {children}
    </button>
  );
}

export default memo(ModalActionButton);
