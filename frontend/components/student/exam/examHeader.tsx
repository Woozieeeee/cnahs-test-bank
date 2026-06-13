import { memo } from "react";

interface ExamHeaderProps {
  title: string;
}

function ExamHeaderComponent({ title }: ExamHeaderProps) {
  return (
    <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm px-6 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-xs text-muted-foreground mt-1">Exam in progress - Stay focused</p>
        </div>
      </div>
    </div>
  );
}

const ExamHeader = memo(ExamHeaderComponent);
export default ExamHeader;
