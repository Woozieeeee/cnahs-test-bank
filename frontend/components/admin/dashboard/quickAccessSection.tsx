import MotionCard from "@/components/motion/motionCard";

import {
  Users,
  ClipboardList,
  FileText,
  GraduationCap,
} from "lucide-react";

import QuickAccessCard from "./quickAccessCard";

export default function QuickAccessSection() {
  return (
    <div>
      <h2
        className="
          mb-4
          text-xl
          font-semibold
          text-foreground
        "
      >
        Quick Access
      </h2>

      <MotionCard
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <QuickAccessCard
          title="Manage Students"
          description="View and manage student accounts"
          href="/admin/users"
          icon={<Users size={28} />}
        />

        <QuickAccessCard
          title="Academic Management"
          description="Manage sections, subjects, and assignments"
          href="/admin/academic"
          icon={<ClipboardList size={28} />}
        />

        <QuickAccessCard
          title="Manage Exams"
          description="Create and organize exams"
          href="/admin/exams"
          icon={<FileText size={28} />}
        />

        <QuickAccessCard
          title="Activity Logs"
          description="View recent system activity"
          href="/admin/activity-logs"
          icon={<GraduationCap size={28} />}
        />
      </MotionCard>
    </div>
  );
}
