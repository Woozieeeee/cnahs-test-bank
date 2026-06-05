"use client";

import { memo, useState } from "react";

import dynamic from "next/dynamic";

import { mockSessionViolations } from "@/components/admin/academic/sections/data/mockSessionViolations";

import ViolationItem from "./violations/violationItem";

import type { Violation } from "@/types/activity/violation";

const ViolationDetailsModal = dynamic(
  () => import("./violations/violationDetailsModal"),
  {
    ssr: false,
  }
);

function StudentSessionViolations() {
  const [selectedViolation, setSelectedViolation] =
    useState<Violation | null>(null);

  return (
    <>
      <div className="border-border bg-card rounded-2xl border p-6">
        {/* HEADER */}

        <div>
          <h2 className="text-lg font-semibold">
            Violations
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Integrity-related incidents detected during
            examination monitoring.
          </p>
        </div>

        {/* TIMELINE */}

        <div className="mt-6 space-y-6">
          {mockSessionViolations.map((violation, index) => (
            <ViolationItem
              key={violation.id}
              violation={violation}
              isLast={
                index === mockSessionViolations.length - 1
              }
              onClick={() =>
                setSelectedViolation(violation)
              }
            />
          ))}
        </div>
      </div>

      {/* MODAL */}

      <ViolationDetailsModal
        violation={selectedViolation}
        onClose={() => setSelectedViolation(null)}
      />
    </>
  );
}

export default memo(StudentSessionViolations);
