"use client";

import {
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

interface Section {
  id: number;

  name: string;
}

interface Props {
  sections: Section[];

  selectedSections: number[];

  setSelectedSections: (value: number[]) => void;
}

function SectionMultiSelect({
  sections,
  selectedSections,
  setSelectedSections,
}: Props) {
  const [search, setSearch] = useState("");

  // =========================
  // SEARCH
  // =========================

  const normalizedSearch = search.toLowerCase();

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  // =========================
  // SECTION LOOKUP
  // =========================

  const sectionMap = useMemo(() => {
    return new Map(
      sections.map((section) => [section.id, section])
    );
  }, [sections]);

  // =========================
  // FILTER SECTIONS
  // =========================

  const filteredSections = useMemo(() => {
    return sections.filter((section) =>
      section.name.toLowerCase().includes(normalizedSearch)
    );
  }, [sections, normalizedSearch]);

  // =========================
  // TOGGLE SECTION
  // =========================

  const toggleSection = useCallback(
    (id: number) => {
      if (selectedSections.includes(id)) {
        setSelectedSections(
          selectedSections.filter(
            (sectionId) => sectionId !== id
          )
        );

        return;
      }

      setSelectedSections([...selectedSections, id]);
    },
    [selectedSections, setSelectedSections]
  );

  return (
    <div className="space-y-4">
      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search sections..."
        value={search}
        onChange={handleSearchChange}
        className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/20 w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2"
      />

      {/* SELECTED */}

      {selectedSections.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSections.map((id) => {
            const section = sectionMap.get(id);

            if (!section) return null;

            return (
              <button
                key={id}
                onClick={() => toggleSection(id)}
                className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium"
              >
                {section.name} ✕
              </button>
            );
          })}
        </div>
      )}

      {/* LIST */}

      <div className="max-h-72 space-y-2 overflow-y-auto">
        {filteredSections.map((section) => {
          const selected = selectedSections.includes(
            section.id
          );

          return (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                selected
                  ? `border-primary bg-primary/10`
                  : `border-border bg-card hover:bg-muted`
              } `}
            >
              <span className="text-foreground text-sm font-medium">
                {section.name}
              </span>

              <div
                className={`h-5 w-5 rounded-full border ${
                  selected
                    ? `border-primary bg-primary`
                    : `border-border`
                } `}
              />
            </button>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="border-border bg-muted/40 text-muted-foreground rounded-xl border border-dashed p-6 text-center text-sm">
            No sections found.
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SectionMultiSelect);
