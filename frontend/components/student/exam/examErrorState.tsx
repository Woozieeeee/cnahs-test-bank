import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ExamErrorStateProps {
  error?: string;
}

export function ExamErrorState({ error }: ExamErrorStateProps) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center p-4">
      <Card className="border-red-200 bg-red-50 p-6 rounded-lg max-w-md w-full">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-red-900">Failed to Load Exam</h3>
            <p className="text-sm text-red-700 mt-1">
              {error || "An unexpected error occurred."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
