"use client";

import Link from "next/link";

import { useMemo, useState } from "react";

import RegistrationTable from "./registrationTable";

import RegistrationPagination from "./registrationPagination";

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
        bg-white
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

          <p className="text-sm text-gray-500">
            Recently registered student accounts
          </p>
        </div>

        <Link
          href="/admin/approvals"
          className="
            text-sm
            font-medium
            text-black
            hover:underline
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

      <RegistrationPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage(currentPage - 1)}
        onNext={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
}
