import { memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BookOpen, Zap, Target, ChevronRight } from "lucide-react";
import type { SubjectCardData } from "@/services/student_dashboard_service";

interface DashboardQuickActionsProps {
  selectedSubject: string | null;
  setSelectedSubject: (slug: string) => void;
  subjects: SubjectCardData[];
}

interface QuickActionProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const QuickAction = memo(function QuickAction({
  label,
  description,
  icon,
  children,
}: QuickActionProps) {
  return (
    <Card className="rounded-lg p-4 border border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-1 text-muted-foreground">{icon}</div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{label}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
        {children || <ChevronRight size={16} className="text-muted-foreground/50 flex-shrink-0" />}
      </div>
    </Card>
  );
});

const DashboardQuickActions = memo(function DashboardQuickActions({
  selectedSubject,
  setSelectedSubject,
  subjects,
}: DashboardQuickActionsProps) {
  const router = useRouter();

  return (
    <Card className="lg:col-span-1 p-6 rounded-lg border border-border/50">
      <h3 className="text-base font-semibold mb-6">Quick Actions</h3>
      <div className="flex flex-col gap-4">
        <Link href="/student/subjects" className="block">
          <QuickAction
            label="Browse Subjects"
            description="Explore all available courses"
            icon={<BookOpen size={18} />}
          />
        </Link>

        <Link
          href={selectedSubject ? `/student/subjects/${selectedSubject}` : "/student/subjects"}
          className="block"
        >
          <QuickAction
            label="Continue Learning"
            description="Resume your studies"
            icon={<Zap size={18} />}
            children={
              subjects.length > 0 ? (
                <select
                  onClick={(e) => e.stopPropagation()}
                  value={selectedSubject || ""}
                  onChange={(e) => {
                    const slug = e.target.value;
                    setSelectedSubject(slug);
                  }}
                  className="text-xs font-medium bg-transparent border border-border/50 rounded px-2 py-1 cursor-pointer hover:border-primary/50"
                >
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.slug}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              ) : (
                <ChevronRight size={16} className="text-muted-foreground/50" />
              )
            }
          />
        </Link>

        <Link href="/student/subjects" className="block">
          <QuickAction
            label="View Progress"
            description="Detailed analytics"
            icon={<Target size={18} />}
          />
        </Link>
      </div>
    </Card>
  );
});

export default DashboardQuickActions;
