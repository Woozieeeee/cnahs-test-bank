import { Loader2 } from "lucide-react";

export function ExamLoadingState() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );
}
