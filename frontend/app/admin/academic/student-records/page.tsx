"use client";

import { useEffect, useState } from "react";

import { getStudentRecords } from "@/services/academic_service";

interface StudentRecord {
  id: number;

  studentId: string;

  fullName: string;

  program: string;

  section?: {
    name: string;
  } | null;
}

export default function StudentRecordsPage() {
  const [records, setRecords] = useState<StudentRecord[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // =========================
  // FETCH RECORDS
  // =========================

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getStudentRecords();

        setRecords(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // =========================
  // FILTER RECORDS
  // =========================

  const filteredRecords = records.filter((record) =>
    [record.studentId, record.fullName]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-6">Loading student records...</div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Student Records
        </h1>

        <p className="mt-2 text-slate-500">
          Manage official institutional student data.
        </p>
      </div>

      {/* FILTERS */}

      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-slate-500
          "
        />

        <button
          className="
            rounded-xl
            bg-slate-900
            px-4
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-slate-800
          "
        >
          Upload CSV
        </button>
      </div>

      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
        "
      >
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Student ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Full Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Program
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Section
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.map((record) => (
              <tr
                key={record.id}
                className="
                    border-t
                    border-slate-100
                  "
              >
                <td className="px-6 py-4 text-sm text-slate-700">
                  {record.studentId}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {record.fullName}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {record.program}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {record.section?.name || "Unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
