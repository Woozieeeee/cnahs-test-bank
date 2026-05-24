import {
  Users,
  ClipboardList,
  FileText,
  GraduationCap,
} from "lucide-react";

import QuickAccessCard from "../quickAccessCard";

export default function QuickAccessSection() {
  return (
    <div>
      <h2
        className="
          mb-4
          text-xl
          font-semibold
          text-gray-800
        "
      >
        Quick Access
      </h2>

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <QuickAccessCard
          title="Pending Accounts"
          description="Review accounts awaiting approval"
          href="/admin/users"
          icon={<ClipboardList size={28} />}
        />

        <QuickAccessCard
          title="Manage Students"
          description="View and manage student records"
          href="/admin/users"
          icon={<Users size={28} />}
        />

        <QuickAccessCard
          title="Manage Exams"
          description="Create and organize exams"
          href="/admin/exams"
          icon={<FileText size={28} />}
        />

        <QuickAccessCard
          title="Faculty Accounts"
          description="Manage faculty members"
          href="/admin/faculty"
          icon={<GraduationCap size={28} />}
        />
      </div>
    </div>
  );
}
