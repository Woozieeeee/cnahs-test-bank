"use client";

import { useEffect, useState } from "react";

import MotionPage from "@/components/motion/motionPage";

import PageContainer from "@/components/layout/pages/pageContainer";

import ActivityHeader from "@/components/admin/academic/activityHeader";

import ActivityTabs from "@/components/admin/activity/activityTabs";

import ActivityFilters from "@/components/admin/activity/activityFilters";

import ActivityTimeline from "@/components/admin/activity/timeline/activityTimeline";

import ActivityDetailsModal from "@/components/admin/activity/modal/activityDetailsModal";

import { getFacultyActivityLogs } from "@/services/faculty_service";

import { FACULTY_ACTIVITY_CATEGORIES } from "@/lib/constants/activity";

import type { ActivityLog } from "@/types/activity/activity";

export default function FacultyActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("ALL");

  const [severity, setSeverity] = useState("ALL");

  const [selectedActivity, setSelectedActivity] =
    useState<ActivityLog | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);

      try {
        const data = await getFacultyActivityLogs({
          page,

          limit: 10,

          search,

          category,

          severity,
        });

        setLogs(data.logs);

        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(
          "Failed to fetch activity logs:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [page, search, category, severity]);

  return (
    <MotionPage>
      <PageContainer>
        <ActivityHeader />

        <ActivityTabs
          activeTab={category}
          setActiveTab={(value) => {
            setCategory(value);

            setPage(1);
          }}
          categories={FACULTY_ACTIVITY_CATEGORIES}
        />

        <ActivityFilters
          search={search}
          setSearch={(value) => {
            setSearch(value);

            setPage(1);
          }}
          category={category}
          setCategory={(value) => {
            setCategory(value);

            setPage(1);
          }}
          severity={severity}
          setSeverity={(value) => {
            setSeverity(value);

            setPage(1);
          }}
          categories={FACULTY_ACTIVITY_CATEGORIES}
        />

        <ActivityTimeline
          logs={logs}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSelectActivity={setSelectedActivity}
        />
      </PageContainer>

      <ActivityDetailsModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </MotionPage>
  );
}
