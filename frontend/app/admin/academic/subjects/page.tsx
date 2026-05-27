"use client";

import SubjectsStats from "@/components/admin/academic/subjects/subjectsStats";
import SubjectsGrid from "@/components/admin/academic/subjects/subjectsGrid";
import SubjectsFilters from "@/components/admin/academic/subjects/subjectsFilters";
import CreateSubjectModal from "@/components/admin/academic/subjects/createSubjectModal";
import AssignFacultyModal from "@/components/admin/academic/subjects/assignFacultyModal";

import { useMemo, useState } from "react";

export default function SubjectsPage() {
  const [search, setSearch] = useState("");

  const [openCreateModal, setOpenCreateModal] =
    useState(false);

  const [openAssignFaculty, setOpenAssignFaculty] =
    useState(false);

  const [selectedSubject, setSelectedSubject] =
    useState<any>(null);

  const [assignmentFilter, setAssignmentFilter] =
    useState("ALL");

  const subjects = [
    {
      id: 1,
      name: "Fundamentals of Nursing",
      code: "NCM101",

      faculty: {
        name: "Prof. Maria Santos",
      },

      sections: [
        {
          id: 1,
          name: "BSN 1A",
        },
      ],

      exams: [{ id: 1 }, { id: 2 }],
    },

    {
      id: 2,
      name: "Pharmacology",
      code: "PHARMA201",

      faculty: null,

      sections: [],

      exams: [],
    },
  ];

  const facultyList = [
    {
      id: 1,
      name: "Prof. Maria Santos",
    },

    {
      id: 2,
      name: "Prof. John Reyes",
    },

    {
      id: 3,
      name: "Prof. Angela Cruz",
    },
  ];

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch =
        subject.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        subject.code
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesAssignment =
        assignmentFilter === "ALL"
          ? true
          : assignmentFilter === "ASSIGNED"
            ? !!subject.faculty
            : !subject.faculty;

      return matchesSearch && matchesAssignment;
    });
  }, [subjects, search, assignmentFilter]);

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-foreground
          "
        >
          Subjects
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage academic subjects, faculty assignments, and
          section allocations.
        </p>
      </div>

      {/* STATS */}

      <SubjectsStats
        totalSubjects={0}
        assignedFaculty={0}
        unassignedSubjects={0}
        totalSections={0}
      />

      {/* FILTERS */}

      <div
        className="
    flex
    flex-col
    gap-4
    md:flex-row
    md:items-center
  "
      >
        <div className="flex-1">
          <SubjectsFilters
            search={search}
            setSearch={setSearch}
            assignmentFilter={assignmentFilter}
            setAssignmentFilter={setAssignmentFilter}
          />
        </div>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="
      rounded-xl
      bg-primary
      px-4
      py-3
      text-sm
      font-medium
      text-primary-foreground
      transition
      hover:bg-primary/90
    "
        >
          Create Subject
        </button>
      </div>

      <SubjectsGrid
        subjects={filteredSubjects}
        onAssignFaculty={(subject) => {
          setSelectedSubject(subject);

          setOpenAssignFaculty(true);
        }}
      />

      <CreateSubjectModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
        onCreate={(data) => {
          console.log(data);
        }}
      />

      <AssignFacultyModal
        open={openAssignFaculty}
        onOpenChange={setOpenAssignFaculty}
        facultyList={facultyList}
        subjectName={selectedSubject?.name || ""}
        onAssign={(facultyId) => {
          console.log(
            "Assign faculty",
            facultyId,
            "to",
            selectedSubject
          );
        }}
      />
    </div>
  );
}
