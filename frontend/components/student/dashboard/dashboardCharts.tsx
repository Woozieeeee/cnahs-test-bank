import { memo } from "react";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SubjectCardData } from "@/services/student_dashboard_service";

interface StatusDataItem {
  name: string;
  value: number;
  fill: string;
}

interface TierBreakdownItem {
  name: string;
  completed: number;
  inProgress: number;
}

interface DashboardChartsProps {
  statusData: StatusDataItem[];
  tierBreakdown: TierBreakdownItem[];
}

const DashboardCharts = memo(function DashboardCharts({
  statusData,
  tierBreakdown,
}: DashboardChartsProps) {
  return (
    <>
      {/* Progress Chart */}
      <Card className="lg:col-span-1 p-6 rounded-lg border border-border/50">
        <h3 className="text-base font-semibold mb-6 text-foreground">Subject Status</h3>
        {statusData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    color: "var(--foreground)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {statusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-muted-foreground">
            No data yet
          </div>
        )}
      </Card>

      {/* Tier Distribution */}
      <Card className="lg:col-span-1 p-6 rounded-lg border border-border/50">
        <h3 className="text-base font-semibold mb-6">Tier Progress</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={tierBreakdown} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
            <Bar dataKey="completed" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
});

export default DashboardCharts;
