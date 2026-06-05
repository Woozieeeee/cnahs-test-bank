"use client";

import { memo } from "react";

import MotionPopover from "@/components/motion/motionPopover";

interface Props {
  suggestions: string[];

  onSelect: (value: string) => void;
}

function SearchSuggestions({
  suggestions,
  onSelect,
}: Props) {
  if (suggestions.length === 0) {
    return null;
  }
  console.log("Rendering suggestions");
  return (
    <MotionPopover
      open={suggestions.length > 0}
      className="bg-card border-border absolute top-full left-0 z-50 mt-2 max-h-72 w-full overflow-auto rounded-xl border shadow-lg"
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => onSelect(suggestion)}
          className="hover:bg-muted w-full px-4 py-3 text-left text-sm transition"
        >
          {suggestion}
        </button>
      ))}
    </MotionPopover>
  );
}

export default memo(SearchSuggestions);
