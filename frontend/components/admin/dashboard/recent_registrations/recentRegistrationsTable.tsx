"use client";

import Link from "next/link";

import { useMemo, useState } from "react";

import RegistrationTable from "./registrationTable";

import Pagination from "@/components/common/pagination";

import RegistrationSearch from "./registrationSearch";

import RegistrationFilter from "./registrationFilter";

interface RecentRegistration {
  id: number;

  name: string;

  studentId: string;

  status: string;

  createdAt: string;
}

interface Props {
  registrations: RecentRegistration[];
}

export default function RecentRegistrationsTable({
  registrations,
}: Props) {
  // =========================
  // STATES
  // =========================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // =========================
  // FILTERING
  // =========================

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.studentId.includes(search);

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [registrations, search, statusFilter]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredRegistrations.length / ITEMS_PER_PAGE
  );

  const paginatedData = filteredRegistrations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,

    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div
      className="
        rounded-2xl
        bg-card
        p-6
        shadow-sm
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Recent Registrations
          </h2>

          <p className="text-sm text-muted-foreground">
            Recently registered student accounts
          </p>
        </div>

        <Link
          href="/admin/approvals"
          className="
             rounded-lg
             border
             border-border
             px-4
             py-2
             text-sm
             font-medium
             text-foreground
             transition
             hover:bg-muted
             cursor-pointer
          "
        >
          View All
        </Link>
      </div>

      {/* FILTERS */}

      <div
        className="
    mb-6
    flex
    flex-col
    gap-4
    md:flex-row
  "
      >
        <RegistrationSearch
          value={search}
          onChange={setSearch}
        />

        <RegistrationFilter
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      {/* TABLE */}

      <RegistrationTable registrations={paginatedData} />

      {/* PAGINATION */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
