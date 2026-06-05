"use client";

import { memo, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function SearchInput({ className = "", ...props }: Props) {
  return (
    <div className={`relative w-full ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
      >
        <circle cx="11" cy="11" r="8" />

        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        {...props}
        className="border-border bg-background focus:border-ring h-11 w-full rounded-xl border pr-4 pl-10 text-sm transition-colors outline-none"
      />
    </div>
  );
}

export default memo(SearchInput);
