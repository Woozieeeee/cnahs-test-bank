"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { FacultyTopic } from "@/types/facultyTopic";

import PageContainer from "@/components/layout/pages/pageContainer";

import BackButton from "@/components/common/backButton";

import LoadingState from "@/components/common/states/loadingState";
import ErrorState from "@/components/common/states/errorState";

import useFacultyTopics from "@/hooks/useFacultyTopics";
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

export default function FacultyTopicsPage() {
  const params = useParams();

  const subjectId = Number(params.subjectId);

  const { topics, loading, error, refresh } =
    useFacultyTopics(subjectId);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [dependencyData, setDependencyData] =
    useState<any>(null);

  const [selectedTopic, setSelectedTopic] =
    useState<FacultyTopic | null>(null);

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

      refresh();
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

      refresh();
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
        topics={filteredTopics}
        onEdit={(topic) => setSelectedTopic(topic)}
        onArchive={handleArchive}
        onRestore={handleRestore}
      />

      {/* CreateTopicModal here */}
      <CreateTopicModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        subjectId={subjectId}
        onSuccess={refresh}
      />

      <EditTopicModal
        topic={selectedTopic}
        open={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        onSuccess={refresh}
      />

      <TopicDependencyModal
        open={!!dependencyData}
        dependencies={dependencyData}
        onClose={() => setDependencyData(null)}
      />
    </PageContainer>
  );
}
