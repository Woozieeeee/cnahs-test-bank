"use client";

import { useState, memo } from "react";
import { useSubjectsPageData } from "@/hooks/admin/useSubjectsPageData";
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
  createSubject,
  assignSubjectSections,
} from "@/services/academic_service";
import { successToast, errorToast } from "@/lib/swal";
import type { Subject } from "@/types/academic/subject";
import PageContainer from "@/components/layout/pages/pageContainer";

export default function SubjectsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Modal states
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAssignFaculty, setOpenAssignFaculty] = useState(false);
  const [openAssignSections, setOpenAssignSections] = useState(false);

  // Use custom hook for data management
  const {
    subjects,
    setSubjects,
    facultyUsers,
    sections,
    initialLoading,
    search,
    setSearch,
    assignmentFilter,
    setAssignmentFilter,
    filteredSubjects,
    fetchSubjects,
  } = useSubjectsPageData(activeTab);

  // Handle create subject
  const handleCreateSubject = async (data: any) => {
    try {
      await createSubject(data);
      successToast("Subject created successfully.");
      fetchSubjects();
    } catch (error: any) {
      console.error(error);
      errorToast(error?.response?.data?.message || "Failed to create subject.");
    }
  };

  // Handle edit subject
  const handleEditSubject = async (updatedSubject: any) => {
    if (!selectedSubject) return;

    try {
      await updateSubject(selectedSubject.id, updatedSubject);
      successToast("Subject updated successfully.");
      setOpenEditModal(false);
      fetchSubjects();
    } catch (error: any) {
      console.error(error);
      errorToast(error?.response?.data?.message || "Failed to update subject.");
    }
  };

  // Handle assign faculty
  const handleAssignFaculty = async (facultyIds: number[]) => {
    if (!selectedSubject) return;

    try {
      await assignFacultiesToSubject(selectedSubject.id, facultyIds);
      successToast("Faculty pool updated successfully.");
      setOpenAssignFaculty(false);
      fetchSubjects();
    } catch (error) {
      console.error(error);
      errorToast("Failed to update faculty pool.");
    }
  };

  // Handle assign sections
  const handleAssignSections = async (sectionIds: number[]) => {
    if (!selectedSubject) return;

    try {
      await assignSubjectSections(selectedSubject.id, sectionIds);
      successToast("Sections assigned successfully.");
      fetchSubjects();
    } catch (error) {
      console.error(error);
      errorToast("Failed to assign sections.");
    }
  };

  if (initialLoading) {
    return <div className="p-6">Loading subjects...</div>;
  }

  return (
    <PageContainer>
      {/* HEADER */}
      <SubjectsHeader />

      {/* TABS */}
      <SubjectsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* STATS */}
      <SubjectsStats
        totalSubjects={subjects.length}
        assignedFaculty={subjects.filter((s) => (s.faculties?.length ?? 0) > 0).length}
        unassignedSubjects={subjects.filter((s) => (s.faculties?.length ?? 0) === 0).length}
        totalSections={subjects.reduce((total, s) => total + (s.sectionSubjects?.length || 0), 0)}
        archivedSubjects={subjects.filter((s) => s.isArchived).length}
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
        onCreate={handleCreateSubject}
      />

      <EditSubjectModal
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        subject={selectedSubject}
        onSave={handleEditSubject}
      />

      <AssignFacultyModal
        open={openAssignFaculty}
        onOpenChange={setOpenAssignFaculty}
        facultyList={facultyUsers}
        subjectName={selectedSubject?.name || ""}
        initialFacultyIds={selectedSubject?.faculties?.map((f) => f.faculty.id) ?? []}
        onAssign={handleAssignFaculty}
      />

      <AssignSectionsModal
        open={openAssignSections}
        onOpenChange={setOpenAssignSections}
        sections={sections}
        subjectName={selectedSubject?.name || ""}
        initialSectionIds={selectedSubject?.sectionSubjects?.map((s) => s.section.id) ?? []}
        onAssign={handleAssignSections}
      />
    </PageContainer>
  );
}
