"use client";

import {
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

interface Faculty {
  id: number;

  name: string;
}

interface Props {
  facultyList: Faculty[];

  selectedFaculties: number[];

  setSelectedFaculties: (value: number[]) => void;
}

function FacultySelect({
  facultyList,
  selectedFaculties,
  setSelectedFaculties,
}: Props) {
  const [search, setSearch] = useState("");

  // =========================
  // SEARCH
  // =========================

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  // =========================
  // FILTER FACULTY
  // =========================

  const filteredFaculty = useMemo(() => {
    const query = search.toLowerCase();

    return facultyList.filter((faculty) =>
      faculty.name.toLowerCase().includes(query)
    );
  }, [facultyList, search]);

  // =========================
  // SELECTED FACULTY DATA
  // =========================

  const selectedFacultyData = useMemo(() => {
    return facultyList.filter((faculty) =>
      selectedFaculties.includes(faculty.id)
    );
  }, [facultyList, selectedFaculties]);

  // =========================
  // TOGGLE FACULTY
  // =========================

  const toggleFaculty = useCallback(
    (facultyId: number) => {
      const exists = selectedFaculties.includes(facultyId);

      if (exists) {
        setSelectedFaculties(
          selectedFaculties.filter((id) => id !== facultyId)
        );

        return;
      }

      setSelectedFaculties([
        ...selectedFaculties,
        facultyId,
      ]);
    },
    [selectedFaculties, setSelectedFaculties]
  );

  return (
    <div className="space-y-4">
      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search faculty..."
        value={search}
        onChange={handleSearchChange}
        className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/20 w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2"
      />

      {/* SELECTED */}

      {selectedFacultyData.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFacultyData.map((faculty) => (
            <button
              key={faculty.id}
              onClick={() => toggleFaculty(faculty.id)}
              className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium"
            >
              {faculty.name} ✕
            </button>
          ))}
        </div>
      )}

      {/* LIST */}

      <div className="max-h-72 space-y-2 overflow-y-auto">
        {filteredFaculty.map((faculty) => {
          const selected = selectedFaculties.includes(
            faculty.id
          );

          return (
            <button
              key={faculty.id}
              onClick={() => toggleFaculty(faculty.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                selected
                  ? `border-primary bg-primary/10`
                  : `border-border bg-card hover:bg-muted`
              } `}
            >
              <span className="text-foreground text-sm font-medium">
                {faculty.name}
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

        {filteredFaculty.length === 0 && (
          <div className="border-border bg-muted/40 text-muted-foreground rounded-xl border border-dashed p-6 text-center text-sm">
            No faculty found.
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(FacultySelect);
