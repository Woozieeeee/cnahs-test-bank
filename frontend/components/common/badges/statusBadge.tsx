import { memo } from "react";

interface Props {
  children: React.ReactNode;

  variant?:
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "default";
}

const variantClasses = {
  success: `
    bg-green-100
    text-green-700
  `,

  warning: `
    bg-orange-100
    text-orange-700
  `,

  danger: `
    bg-red-100
    text-red-700
  `,

  info: `
    bg-blue-100
    text-blue-700
  `,

  default: `
    bg-muted
    text-muted-foreground
  `,
};

function StatusBadge({
  children,
  variant = "default",
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${variantClasses[variant]} `}
    >
      {children}
    </span>
  );
}

export default memo(StatusBadge);
