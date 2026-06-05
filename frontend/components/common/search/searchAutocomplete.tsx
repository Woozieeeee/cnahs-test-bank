"use client";

import { useMemo, useState } from "react";

import SearchInput from "./searchInput";

import SearchSuggestions from "./searchSuggestions";

interface Props {
  value: string;

  onChange: (value: string) => void;

  suggestions: string[];

  placeholder?: string;
}

export default function SearchAutocomplete({
  value,
  onChange,
  suggestions,
  placeholder = "Search...",
}: Props) {
  const [showSuggestions, setShowSuggestions] =
    useState(false);
  const filteredSuggestions = useMemo(() => {
    if (!suggestions.length) {
      return [];
    }

    if (!value.trim()) {
      return suggestions.slice(0, 8);
    }

    return suggestions
      .filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 8);
  }, [value, suggestions]);
  console.log("Questions:", suggestions.length);

  console.log("Filtered:", filteredSuggestions.length);

  return (
    <div className="relative">
      <SearchInput
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const value = e.target.value;

          onChange(value);

          setShowSuggestions(value.trim().length > 0);
        }}
      />

      {showSuggestions &&
        filteredSuggestions.length > 0 && (
          <SearchSuggestions
            suggestions={filteredSuggestions}
            onSelect={(selected) => {
              onChange(selected);
              setShowSuggestions(false);
            }}
          />
        )}
    </div>
  );
}
