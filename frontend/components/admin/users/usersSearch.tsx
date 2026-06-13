"use client";

import SearchAutocomplete from "@/components/common/search/searchAutocomplete";

interface Props {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
}

export default function UsersSearch({ value, onChange, suggestions }: Props) {
  return (
    <SearchAutocomplete
      value={value}
      onChange={onChange}
      suggestions={suggestions}
      placeholder="Search by name, student ID, or username..."
    />
  );
}
