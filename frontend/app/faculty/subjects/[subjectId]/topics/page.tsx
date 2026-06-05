"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { FacultyTopic } from "@/types/faculty/facultyTopic";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";

import useFacultyTopics from "@/hooks/faculty/topics/useFacultyTopics";
import CreateTopicModal from "@/components/faculty/topics/modals/createTopicModal";
import EditTopicModal from "@/components/faculty/topics/modals/editTopicModal";

import {
  archiveFacultyTopic,
  restoreFacultyTopic,
} from "@/services/faculty_service";

import { successToast, errorToast } from "@/lib/swal";
import FacultyTopicHeader from "@/components/faculty/topics/facultyTopicHeader";
import FacultyTopicStats from "@/components/faculty/topics/facultyTopicStats";
import FacultyTopicFilters from "@/components/faculty/topics/facultyTopicFilters";
import TopicDependencyModal from "@/components/faculty/topics/modals/topicDependencyModal";
import FacultyTopicGrid from "../../../../../components/faculty/topics/facultyTopicGrid";
import Pagination from "@/components/common/pagination";

export default function FacultyTopicsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { topics, setTopics, loading, error, refresh } =
    useFacultyTopics(subjectId);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [dependencyData, setDependencyData] =
    useState<any>(null);

  const [selectedTopic, setSelectedTopic] =
    useState<FacultyTopic | null>(null);

  const handleTopicCreated = (topic: FacultyTopic) => {
    setTopics((current) => [topic, ...current]);
    setShowCreateModal(false);
    setCurrentPage(1);
  };

  const handleTopicUpdated = (
    updatedTopic: FacultyTopic
  ) => {
    setTopics((current) =>
      current.map((topic) =>
        topic.id === updatedTopic.id ? updatedTopic : topic
      )
    );
    setSelectedTopic(null);
  };

  const handleTopicArchiveSuccess = (topicId: number) => {
    setTopics((current) =>
      current.map((topic) =>
        topic.id === topicId
          ? { ...topic, isArchived: true }
          : topic
      )
    );
  };

  const handleTopicRestoreSuccess = (topicId: number) => {
    setTopics((current) =>
      current.map((topic) =>
        topic.id === topicId
          ? { ...topic, isArchived: false }
          : topic
      )
    );
  };

  const filteredTopics = useMemo(() => {
    let result = [...topics];

    if (search.trim()) {
      result = result.filter((topic) =>
        topic.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (status === "ACTIVE") {
      result = result.filter((topic) => !topic.isArchived);
    }

    if (status === "ARCHIVED") {
      result = result.filter((topic) => topic.isArchived);
    }

    return result;
  }, [topics, search, status]);

  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTopics.length / ITEMS_PER_PAGE)
  );

  const paginatedTopics = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredTopics.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredTopics, currentPage]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingState
          title="Loading topics..."
          description="Please wait while we retrieve topic information."
        />
      </PageContainer>
    );
  }
  const handleArchive = async (topicId: number) => {
    try {
      await archiveFacultyTopic(topicId);

      successToast("Topic archived successfully.");

      handleTopicArchiveSuccess(topicId);
    } catch (error: any) {
      const dependencies =
        error.response?.data?.dependencies;

      if (dependencies) {
        setDependencyData(dependencies);

        return;
      }

      errorToast(
        error.response?.data?.message ||
          "Failed to archive topic."
      );
    }
  };

  const handleRestore = async (topicId: number) => {
    try {
      await restoreFacultyTopic(topicId);

      successToast("Topic restored successfully.");

      handleTopicRestoreSuccess(topicId);
    } catch (error: any) {
      errorToast(
        error.response?.data?.message ||
          "Failed to restore topic."
      );
    }
  };

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load topics."
          description={error}
          onRetry={refresh}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton
        href={`/faculty/subjects/${subjectId}`}
        label="Back to Subject"
      />

      <FacultyTopicHeader
        onCreate={() => setShowCreateModal(true)}
      />
      <FacultyTopicStats
        totalTopics={topics.length}
        activeTopics={
          topics.filter((topic) => !topic.isArchived).length
        }
        totalQuestions={topics.reduce(
          (sum, topic) => sum + topic.totalQuestions,
          0
        )}
      />

      <FacultyTopicFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <FacultyTopicGrid
        subjectId={subjectId}
        topics={paginatedTopics}
        onEdit={(topic) => setSelectedTopic(topic)}
        onArchive={handleArchive}
        onRestore={handleRestore}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* CreateTopicModal here */}
      <CreateTopicModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        subjectId={subjectId}
        onSuccess={handleTopicCreated}
      />

      <EditTopicModal
        topic={selectedTopic}
        open={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        onSuccess={handleTopicUpdated}
      />

      <TopicDependencyModal
        open={!!dependencyData}
        dependencies={dependencyData}
        onClose={() => setDependencyData(null)}
      />
    </PageContainer>
  );
}
