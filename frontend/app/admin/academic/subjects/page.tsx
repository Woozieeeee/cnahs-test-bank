"use client";

import { useEffect, useMemo, useState } from "react";
import SubjectsStats from "@/components/admin/academic/subjects/subjectsStats";
import SubjectsGrid from "@/components/admin/academic/subjects/subjectsGrid";
import SubjectsTabs from "@/components/admin/academic/subjects/subjectTabs";
import CreateSubjectModal from "@/components/admin/academic/subjects/createSubjectModal";
import AssignFacultyModal from "@/components/admin/academic/subjects/assignFacultyModal";
import AssignSectionsModal from "@/components/admin/academic/subjects/assignSubjectModal";
import EditSubjectModal from "@/components/admin/academic/subjects/editSubjectModal";
import SubjectsHeader from "@/components/admin/academic/subjects/sections/subjectsHeader";
import SubjectsActions from "@/components/admin/academic/subjects/sections/subjectsActions";
import {
  updateSubject,
  assignFacultyToSubject,
} from "@/services/academic_service";
import { createSubject } from "@/services/academic_service";
import { mockFaculty } from "@/components/admin/academic/subjects/data/mockFaculty";
import { mockSections } from "@/components/admin/academic/subjects/data/mockSections";
import { assignSubjectSections } from "@/services/academic_service";
import { successToast, errorToast } from "@/lib/swal";
import { getSubjects } from "@/services/academic_service";
import type { Subject } from "@/types/subject";

export default function SubjectsPage() {
  // =========================
  // STATES
  // =========================

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [initialLoading, setInitialLoading] =
    useState(true);

  const [search, setSearch] = useState("");

  const [assignmentFilter, setAssignmentFilter] =
    useState("ALL");

  const [activeTab, setActiveTab] = useState("ALL");

  const [selectedSubject, setSelectedSubject] =
    useState<Subject | null>(null);

  // =========================
  // MODALS
  // =========================

  const [openCreateModal, setOpenCreateModal] =
    useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [openAssignFaculty, setOpenAssignFaculty] =
    useState(false);

  const [openAssignSections, setOpenAssignSections] =
    useState(false);

  // =========================
  // FETCH SUBJECTS
  // =========================

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects(activeTab);
      setSubjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [activeTab]);

  // =========================
  // FILTERING
  // =========================

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

  // =========================
  // LOADING
  // =========================

  if (initialLoading) {
    return <div className="p-6">Loading subjects...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <SubjectsHeader />

      {/* TABS */}

      <SubjectsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* STATS */}

      <SubjectsStats
        totalSubjects={subjects.length}
        assignedFaculty={
          subjects.filter((subject) => subject.faculty)
            .length
        }
        unassignedSubjects={
          subjects.filter((subject) => !subject.faculty)
            .length
        }
        totalSections={subjects.reduce(
          (total, subject) =>
            total + (subject.sectionSubjects?.length || 0),
          0
        )}
        archivedSubjects={
          subjects.filter((subject) => subject.isArchived)
            .length
        }
      />

      {/* ACTIONS */}

      <SubjectsActions
        search={search}
        setSearch={setSearch}
        assignmentFilter={assignmentFilter}
        setAssignmentFilter={setAssignmentFilter}
        onCreate={() => setOpenCreateModal(true)}
      />

      {/* GRID */}

      <SubjectsGrid
        subjects={filteredSubjects}
        onRefresh={fetchSubjects}
        onEdit={(subject) => {
          setSelectedSubject(subject);

          setOpenEditModal(true);
        }}
        onAssignFaculty={(subject) => {
          setSelectedSubject(subject);

          setOpenAssignFaculty(true);
        }}
        onAssignSections={(subject) => {
          setSelectedSubject(subject);

          setOpenAssignSections(true);
        }}
      />

      {/* MODALS */}

      <CreateSubjectModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
        onCreate={async (data) => {
          try {
            await createSubject(data);

            successToast("Subject created successfully.");

            fetchSubjects();
          } catch (error: any) {
            console.error(error);

            errorToast(
              error?.response?.data?.message ||
                "Failed to create subject."
            );
          }
        }}
      />

      <EditSubjectModal
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        subject={selectedSubject}
        onSave={async (updatedSubject) => {
          if (!selectedSubject) return;

          try {
            await updateSubject(
              selectedSubject.id,
              updatedSubject
            );

            successToast("Subject updated successfully.");

            setOpenEditModal(false);

            fetchSubjects();
          } catch (error: any) {
            console.error(error);

            errorToast(
              error?.response?.data?.message ||
                "Failed to update subject."
            );
          }
        }}
      />

      <AssignFacultyModal
        open={openAssignFaculty}
        onOpenChange={setOpenAssignFaculty}
        facultyList={mockFaculty}
        subjectName={selectedSubject?.name || ""}
        onAssign={async (facultyId) => {
          if (!selectedSubject) return;

          try {
            await assignFacultyToSubject(
              selectedSubject.id,
              facultyId
            );

            successToast("Faculty assigned successfully.");

            setOpenAssignFaculty(false);

            fetchSubjects();
          } catch (error) {
            console.error(error);

            errorToast("Failed to assign faculty.");
          }
        }}
      />

      <AssignSectionsModal
        open={openAssignSections}
        onOpenChange={setOpenAssignSections}
        sections={mockSections}
        subjectName={selectedSubject?.name || ""}
        onAssign={async (sectionIds) => {
          if (!selectedSubject) return;

          try {
            await assignSubjectSections(
              selectedSubject.id,
              sectionIds
            );

            successToast("Sections assigned successfully.");

            fetchSubjects();
          } catch (error) {
            console.error(error);

            errorToast("Failed to assign sections.");
          }
        }}
      />
    </div>
  );
}
