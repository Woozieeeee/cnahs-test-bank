import Link from "next/link";
import BackButton from "@/components/common/backButton";
import { ArrowLeft } from "lucide-react";

export default function StudentRecordsHeader() {
  return (
    <div className="space-y-4">
      <BackButton
        href="/admin/academic"
        label="Back to Academic Management"
      />
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
