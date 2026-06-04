"use client";

import { memo, useEffect, useRef, useState } from "react";

import { MoreVertical } from "lucide-react";

import SubjectDropdownItem from "./subjectDropdownItem";

interface DropdownItem {
  label: string;

  danger?: boolean;

  onClick: () => void;
}

interface Props {
  items: DropdownItem[];
}

function SubjectDropdown({ items }: Props) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border-border bg-background hover:bg-muted flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open && (
        <div className="border-border bg-card absolute top-11 right-0 z-50 w-52 rounded-xl border p-2 shadow-lg">
          {items.map((item) => (
            <SubjectDropdownItem
              key={item.label}
              label={item.label}
              danger={item.danger}
              onClick={() => {
                item.onClick();

                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(SubjectDropdown);
