"use client";

import { useEffect, useState } from "react";

import MotionPage from "@/components/motion/motionPage";

import ActivityTabs from "@/components/admin/activity/activityTabs";
import ActivityFilters from "@/components/admin/activity/activityFilters";

import ActivityTimeline from "@/components/admin/activity/timeline/activityTimeline";

import ActivityDetailsModal from "@/components/admin/activity/modal/activityDetailsModal";

import { getActivityLogs } from "@/services/admin_service";

import type { ActivityLog } from "@/types/activity";

export default function ActivityLogsPage() {
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
      <div className="space-y-6">
        {/* HEADER */}

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-foreground
            "
          >
            Activity Logs
          </h1>

          <p className="mt-2 text-muted-foreground">
            Monitor recent administrative actions,
            violations, approvals, and system events.
          </p>
        </div>

        {/* TABS */}

        <ActivityTabs
          activeTab={category}
          setActiveTab={(value) => {
            setCategory(value);

            setPage(1);
          }}
        />

        {/* FILTERS */}

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

        {/* TIMELINE */}

        <ActivityTimeline
          logs={logs}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onSelectActivity={setSelectedActivity}
        />
      </div>

      {/* DETAILS MODAL */}

      <ActivityDetailsModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </MotionPage>
  );
}
