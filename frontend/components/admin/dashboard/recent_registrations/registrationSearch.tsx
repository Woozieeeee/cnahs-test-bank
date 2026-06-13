"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface RecentRegistration {
  id: number;
  name: string;
  studentId: string;
  status: string;
  createdAt: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  registrations: RecentRegistration[];
}

export default function RegistrationSearch({
  value,
  onChange,
  registrations,
}: Props) {
  const [showSuggestions, setShowSuggestions] =
    useState(false);
  const [suggestions, setSuggestions] = useState<
    { name: string; studentId: string }[]
  >([]);

  useEffect(() => {
    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = registrations
      .filter(
        (reg) =>
          reg.name
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          reg.studentId
            .toLowerCase()
            .includes(value.toLowerCase())
      )
      .slice(0, 5)
      .map((reg) => ({
        name: reg.name,
        studentId: reg.studentId,
      }));

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [value, registrations]);

  const handleSuggestionClick = (suggestion: {
    name: string;
    studentId: string;
  }) => {
    onChange(suggestion.name);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    onChange("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search
          size={18}
          className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search student..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() =>
            setShowSuggestions(suggestions.length > 0)
          }
          onBlur={() =>
            setTimeout(() => setShowSuggestions(false), 200)
          }
          className="border-border bg-background focus:ring-primary w-full rounded-lg border py-3 pr-10 pl-10 text-sm outline-none focus:ring-2"
        />
        {value && (
          <button
            onClick={clearSearch}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="bg-background border-border absolute z-10 mt-1 w-full rounded-lg border shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() =>
                handleSuggestionClick(suggestion)
              }
              className="text-foreground hover:bg-muted w-full px-4 py-3 text-left text-sm transition"
            >
              <div className="font-medium">
                {suggestion.name}
              </div>
              <div className="text-muted-foreground text-xs">
                {suggestion.studentId}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
