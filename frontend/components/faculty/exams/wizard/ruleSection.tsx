"use client";

import { memo, ReactNode } from "react";

interface Props {
  title: string;

  description?: string;

  children: ReactNode;

  collapsible?: boolean;

  isOpen?: boolean;

  onToggle?: () => void;
}

function RuleSection({
  title,
  description,
  children,
  collapsible = false,
  isOpen = true,
  onToggle,
}: Props) {
  return (
    <div className="border-border bg-card rounded-2xl border p-5">
      <div
        className={`flex items-center justify-between ${
          collapsible ? "cursor-pointer" : ""
        }`}
        onClick={collapsible ? onToggle : undefined}
      >
        <div>
          <h3 className="font-semibold">{title}</h3>

          {description && (
            <p className="text-muted-foreground mt-1 text-sm">
              {description}
            </p>
          )}
        </div>

        {collapsible && (
          <span className="text-muted-foreground">
            {isOpen ? "▼" : "▶"}
          </span>
        )}
      </div>

      {(!collapsible || isOpen) && (
        <div className="mt-4 space-y-3">{children}</div>
      )}
    </div>
  );
}

export default memo(RuleSection);
