"use client";

import { useEffect, useState } from "react";

import AnimatedPage from "@/components/common/animatedPage";

import ActivityTimelineItem from "@/components/admin/activity/activityTimelineItem";

import UsersPagination from "@/components/admin/users/usersPagination";

import { getActivityLogs } from "@/services/admin_service";

interface Activity {
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
  const [logs, setLogs] = useState<Activity[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("ALL");

  const [severity, setSeverity] = useState("ALL");

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
    <AnimatedPage>
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

        {/* FILTERS */}

        <div
          className="
            flex
            flex-col
            gap-4
            rounded-2xl
            bg-white
            p-4
            shadow-sm
            md:flex-row
          "
        >
          <input
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              outline-none
            "
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
            "
          >
            <option value="ALL">All Categories</option>

            <option value="USER_MANAGEMENT">
              User Management
            </option>

            <option value="APPROVALS">Approvals</option>

            <option value="STUDENT_RECORDS">
              Student Records
            </option>
          </select>

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
            "
          >
            <option value="ALL">All Severity</option>

            <option value="INFO">INFO</option>

            <option value="SUCCESS">SUCCESS</option>

            <option value="WARNING">WARNING</option>

            <option value="ERROR">ERROR</option>
          </select>
        </div>

        {/* TIMELINE */}

        <div
          className="
            rounded-2xl
            bg-white
            p-6
            shadow-sm
          "
        >
          <div className="space-y-8">
            {logs.map((activity, index) => (
              <ActivityTimelineItem
                key={activity.id}
                activity={activity}
                timeLabel={new Date(
                  activity.createdAt
                ).toLocaleTimeString()}
                isLast={index === logs.length - 1}
              />
            ))}
          </div>

          {/* EMPTY */}

          {logs.length === 0 && (
            <div
              className="
                py-16
                text-center
                text-slate-500
              "
            >
              No activity logs found.
            </div>
          )}

          {/* PAGINATION */}

          <div className="mt-8">
            <UsersPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
