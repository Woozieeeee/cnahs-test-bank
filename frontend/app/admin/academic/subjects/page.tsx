"use client";

import { useEffect, useMemo, useState } from "react";
import SubjectsStats from "@/components/admin/academic/subjects/subjectsStats";
import SubjectsGrid from "@/components/admin/academic/subjects/subjectsGrid";
import SubjectsTabs from "@/components/admin/academic/subjects/subjectTabs";
import CreateSubjectModal from "@/components/admin/academic/subjects/createSubjectModal";
import AssignFacultyModal from "@/components/admin/academic/subjects/assignFacultyModal";
import AssignSectionsModal from "@/components/admin/academic/subjects/assignSectionModal";
import EditSubjectModal from "@/components/admin/academic/subjects/editSubjectModal";
import SubjectsHeader from "@/components/admin/academic/subjects/sections/subjectsHeader";
import SubjectsActions from "@/components/admin/academic/subjects/sections/subjectsActions";
import {
  updateSubject,
  assignFacultiesToSubject,
} from "@/services/academic_service";
import { createSubject } from "@/services/academic_service";
import {
  assignSubjectSections,
  getSections,
} from "@/services/academic_service";
import { getFacultyUsers } from "@/services/admin_service";
import { successToast, errorToast } from "@/lib/swal";
import { getSubjects } from "@/services/academic_service";
import type { Subject } from "@/types/subject";
import type { Section } from "@/types/section";
import PageContainer from "@/components/layout/pages/pageContainer";

export default function SubjectsPage() {
  // =========================
  // STATES
  // =========================

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [facultyUsers, setFacultyUsers] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const [sections, setSections] = useState<Section[]>([]);

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

  const fetchDependencies = async () => {
    try {
      const [facultyData, sectionData] = await Promise.all([
        getFacultyUsers(),
        getSections(),
      ]);

      setFacultyUsers(facultyData);

      setSections(sectionData);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    fetchDependencies();
  }, []);

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

      const hasFaculty =
        (subject.faculties?.length ?? 0) > 0;

      const matchesAssignment =
        assignmentFilter === "ALL"
          ? true
          : assignmentFilter === "ASSIGNED"
            ? hasFaculty
            : !hasFaculty;

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
    <PageContainer>
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
          subjects.filter(
            (subject) =>
              (subject.faculties?.length ?? 0) > 0
          ).length
        }
        unassignedSubjects={
          subjects.filter(
            (subject) =>
              (subject.faculties?.length ?? 0) === 0
          ).length
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
        facultyList={facultyUsers}
        subjectName={selectedSubject?.name || ""}
        initialFacultyIds={
          selectedSubject?.faculties?.map(
            (faculty) => faculty.faculty.id
          ) ?? []
        }
        onAssign={async (facultyIds) => {
          if (!selectedSubject) return;

          try {
            await assignFacultiesToSubject(
              selectedSubject.id,
              facultyIds
            );

            successToast(
              "Faculty pool updated successfully."
            );

            setOpenAssignFaculty(false);

            fetchSubjects();
          } catch (error) {
            console.error(error);

            errorToast("Failed to update faculty pool.");
          }
        }}
      />

      <AssignSectionsModal
        open={openAssignSections}
        onOpenChange={setOpenAssignSections}
        sections={sections}
        subjectName={selectedSubject?.name || ""}
        initialSectionIds={
          selectedSubject?.sectionSubjects?.map(
            (item) => item.section.id
          ) ?? []
        }
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
    </PageContainer>
  );
}
