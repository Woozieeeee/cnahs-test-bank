import { memo } from "react";

interface Props {
  children: React.ReactNode;

  className?: string;

  large?: boolean;
}

function InfoCardValue({
  children,
  className = "",
  large = false,
}: Props) {
  return (
    <p
      className={`text-foreground mt-2 ${large ? "text-3xl font-bold" : "font-medium"} ${className} `}
    >
      {children}
    </p>
  );
}

export default memo(InfoCardValue);
