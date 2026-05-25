"use client";

import {
  ACTIVITY_CATEGORIES,
  ACTIVITY_SEVERITIES,
} from "@/lib/constants/activity";

import MotionDropdown from "@/components/motion/motionDropdown";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  category: string;

  setCategory: (value: string) => void;

  severity: string;

  setSeverity: (value: string) => void;
}

export default function ActivityFilters({
  search,
  setSearch,
  category,
  setCategory,
  severity,
  setSeverity,
}: Props) {
  return (
    <MotionDropdown>
      <div
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          bg-white
          p-4
          shadow-sm
          md:flex-row
        "
      >
        <input
          type="text"
          placeholder="Search activity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            outline-none
            transition
            focus:border-slate-400
          "
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
          "
        >
          {ACTIVITY_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
          "
        >
          {ACTIVITY_SEVERITIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </MotionDropdown>
  );
}
