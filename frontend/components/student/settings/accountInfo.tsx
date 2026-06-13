import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Zap, Calendar } from "lucide-react";
import type { AuthUser } from "@/types/auth/auth";

interface AccountInfoProps {
  user: AuthUser | null;
}

const AccountInfo = memo(function AccountInfo({ user }: AccountInfoProps) {
  // Calculate account age in days
  const getAccountAge = () => {
    if (!user?.createdAt) return { days: 0, dateStr: "Unknown" };

    const createdDate = new Date(user.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dateStr = createdDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return { days: Math.max(1, diffDays), dateStr };
  };

  const accountAge = getAccountAge();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Activity Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Learning Streak */}
        <Card className="rounded-lg p-4 border border-border/50">
          <div className="flex items-start gap-3">
            <div className="bg-muted/40 rounded-lg p-2.5">
              <Zap size={20} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Learning Streak</p>
              <p className="mt-1 font-semibold text-foreground">0 Days</p>
            </div>
          </div>
        </Card>

        {/* Account Created - Now shows days old + approval date */}
        <Card className="rounded-lg p-4 border border-border/50">
          <div className="flex items-start gap-3">
            <div className="bg-muted/40 rounded-lg p-2.5">
              <Calendar size={20} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Account Approved</p>
              <p className="mt-1 font-semibold text-foreground">
                Day {accountAge.days} - {accountAge.dateStr}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
});

export default AccountInfo;
