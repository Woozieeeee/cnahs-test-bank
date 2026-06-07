"use client";

import { memo } from "react";

interface Props {
  label: string;

  description?: string;

  checked: boolean;

  onChange: (value: boolean) => void;
}

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: Props) {
  return (
    <div className="border-border flex items-center justify-between rounded-xl border p-4">
      <div className="pr-4">
        <p className="font-medium">{label}</p>

        {description && (
          <p className="text-muted-foreground mt-1 text-sm">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default memo(ToggleField);
