"use client";

import { useEffect, useState } from "react";
import { getStudentRecords } from "@/services/academic_service";
import StudentRecordsHeader from "@/components/admin/academic/student-records/studentRecordsHeader";
import StudentRecordsTable from "@/components/admin/academic/student-records/studentRecordsTable";
import UploadCsvButton from "@/components/admin/academic/student-records/uploadCsvButton";

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

      <StudentRecordsHeader />

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

        <UploadCsvButton
          onSuccess={() => {
            window.location.reload();
          }}
        />
      </div>

      {/* TABLE */}

      <StudentRecordsTable records={filteredRecords} />
    </div>
  );
}
