import { memo } from "react";

interface Props {
  label: string;
}

function CardFooterLink({ label }: Props) {
  return (
    <div className="border-border mt-6 flex items-center justify-between border-t pt-4">
      <p className="text-muted-foreground text-sm">
        {label}
      </p>

      <span className="text-foreground text-sm font-medium">
        →
      </span>
    </div>
  );
}

export default memo(CardFooterLink);
