"use client";

import { useEffect, useState } from "react";
import { getStudentRecords } from "@/services/academic_service";
import StudentRecordsHeader from "@/components/admin/academic/student-records/studentRecordsHeader";
import StudentRecordsTable from "@/components/admin/academic/student-records/studentRecordsTable";
import UploadCsvButton from "@/components/admin/academic/student-records/tools/uploadCsvButton";
import DownloadTemplateButton from "@/components/admin/academic/student-records/tools/downloadTemplateButton";
import Pagination from "@/components/common/pagination";
import StudentRecordsActions from "@/components/admin/academic/student-records/studentRecordsActions";
import AddStudentRecordModal from "@/components/admin/academic/student-records/addStudentRecordModal";
import EditStudentRecordModal from "@/components/admin/academic/student-records/editStudentRecordModal";
import PageContainer from "@/components/layout/pages/pageContainer";

interface StudentRecord {
  id: number;
  studentId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
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
  const [sortField, setSortField] = useState("lastName");
  const [sortOrder, setSortOrder] = useState<
    "asc" | "desc"
  >("asc");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<StudentRecord | null>(null);

  // =========================
  // FETCH RECORDS
  // =========================

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

  useEffect(() => {
    fetchRecords();
  }, []);

  // =========================
  // FILTER RECORDS
  // =========================

  const filteredRecords = records
    .filter((record) =>
      [
        record.studentId,

        record.firstName,

        record.middleName,

        record.lastName,

        record.suffix,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = String(
        a[sortField as keyof StudentRecord] || ""
      ).toLowerCase();

      const bValue = String(
        b[sortField as keyof StudentRecord] || ""
      ).toLowerCase();

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      }

      return bValue.localeCompare(aValue);
    });

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredRecords.length / ITEMS_PER_PAGE
  );

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,

    currentPage * ITEMS_PER_PAGE
  );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="text-muted-foreground flex min-h-screen items-center justify-center">
        Loading student records...
      </div>
    );
  }

  return (
    <PageContainer>
      {/* HEADER */}

      <StudentRecordsHeader />

      {/* FILTERS */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-muted focus:border-muted-foreground w-full rounded-xl border px-4 py-3 outline-none"
        />

        <div className="flex items-center gap-3">
          <StudentRecordsActions
            onUploadSuccess={fetchRecords}
            onAddStudent={() => {
              setOpenAddModal(true);
            }}
          />
        </div>
      </div>

      {/* TABLE */}

      <StudentRecordsTable
        records={paginatedRecords}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={(field, order) => {
          setSortField(field);

          setSortOrder(order);
        }}
        onEdit={(record) => {
          setSelectedRecord(record);

          setOpenEditModal(true);
        }}
      />

      <AddStudentRecordModal
        open={openAddModal}
        onOpenChange={setOpenAddModal}
        onSuccess={fetchRecords}
      />

      <EditStudentRecordModal
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        record={selectedRecord}
        onSuccess={fetchRecords}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
}
