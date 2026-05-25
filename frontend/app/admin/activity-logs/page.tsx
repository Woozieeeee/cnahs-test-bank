"use client";

import { useEffect, useState } from "react";
import MotionPage from "@/components/motion/motionPage";
import { getActivityLogs } from "@/services/admin_service";
import ActivityDetailsModal from "@/components/admin/activity/activityDetailsModal";
import ActivityTabs from "@/components/admin/activity/activityTabs";
import ActivityFilters from "@/components/admin/activity/activityFilters";
import ActivityTimeline from "@/components/admin/activity/timeline/activityTimeline";

interface ActivityLog {
  id: number;
  action: string;
  category: string;
  severity: string;
  description?: string;
  performedBy: string;
  targetUser?: string;
  createdAt: string;
}

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
        console.log(error);
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
              text-slate-900
            "
          >
            Activity Logs
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor recent administrative actions and system
            events.
          </p>
        </div>

        {/* TABS */}

        <ActivityTabs
          activeTab={category}
          setActiveTab={setCategory}
        />

        {/* FILTERS */}

        <ActivityFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          severity={severity}
          setSeverity={setSeverity}
        />

        {/* TIMELINE */}

        <ActivityTimeline
          logs={logs}
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
