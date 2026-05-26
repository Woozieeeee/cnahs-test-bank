import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export default function StudentRecordsHeader() {
  return (
    <div className="space-y-4">
      <Link
        href="/admin/academic"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-slate-500
          transition
          hover:text-slate-900
        "
      >
        <ArrowLeft size={16} />
        Back to Academic Management
      </Link>

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Student Records
        </h1>

        <p className="mt-2 text-slate-500">
          Manage official student verification records.
        </p>
      </div>
    </div>
  );
}
