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
          text-muted-foreground
          transition
          hover:text-foreground
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
            text-foreground
          "
        >
          Student Records
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage official student verification records.
        </p>
      </div>
    </div>
  );
}
