"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import MotionPage from "@/components/motion/motionPage";

import PageContainer from "@/components/layout/pages/pageContainer";

import ActivityHeader from "@/components/admin/academic/activityHeader";

import ActivityTabs from "@/components/admin/activity/activityTabs";

import ActivityFilters from "@/components/admin/activity/activityFilters";

import ActivityTimeline from "@/components/admin/activity/timeline/activityTimeline";

import ActivityDetailsModal from "@/components/admin/activity/modal/activityDetailsModal";

import { getActivityLogs } from "@/services/admin_service";

import type { ActivityLog } from "@/types/activity/activity";

export default function ActivityLogsPage() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

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
        const data = await getActivityLogs({
          page,

          limit: 10,

          search,

          category,

          severity,
        });

        setLogs(data.logs);

        setTotalPages(data.totalPages);

        // If we have a highlight ID, find and open that activity
        if (highlightId) {
          const activityToHighlight = data.logs.find(
            (log: ActivityLog) => log.id === parseInt(highlightId),
          );
          if (activityToHighlight) {
            setSelectedActivity(activityToHighlight);
            // Scroll to element if it exists
            setTimeout(() => {
              const element = document.getElementById(
                `activity-${highlightId}`,
              );
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                element.classList.add("ring-2", "ring-blue-500", "rounded");
                
                // Remove highlight after 2 seconds
                setTimeout(() => {
                  element.classList.remove("ring-2", "ring-blue-500", "rounded");
                }, 1000);
              }
            }, 100);
          }
        }
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
  }, [page, search, category, severity, highlightId]);

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
        />

        <ActivityTimeline
          logs={logs}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSelectActivity={setSelectedActivity}
          highlightId={highlightId ? parseInt(highlightId) : undefined}
        />
      </PageContainer>

      <ActivityDetailsModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </MotionPage>
  );
}
