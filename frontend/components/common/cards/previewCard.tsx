import { memo } from "react";

interface Props {
  title: string;

  description?: string;

  children?: React.ReactNode;

  className?: string;
}

function PreviewCard({
  title,
  description,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`border-border rounded-xl border p-4 transition-all duration-200 ${className} `}
    >
      <p className="font-medium">{title}</p>

      {description && (
        <p className="text-muted-foreground mt-1 text-sm">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}

export default memo(PreviewCard);
