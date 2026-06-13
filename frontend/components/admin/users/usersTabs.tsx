import MotionButton from "@/components/motion/motionButton";

export type UserFilterTab =
  | "ALL"
  | "STUDENT"
  | "FACULTY"
  | "ADMIN"
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

interface Props {
  activeTab: UserFilterTab;
  onTabChange: (tab: UserFilterTab) => void;
}

const tabs: Array<{ id: UserFilterTab; label: string; group: "role" | "status" }> = [
  { id: "ALL", label: "All", group: "role" },
  { id: "STUDENT", label: "Students", group: "role" },
  { id: "FACULTY", label: "Faculty", group: "role" },
  { id: "ADMIN", label: "Admins", group: "role" },
  { id: "PENDING", label: "Pending", group: "status" },
  { id: "APPROVED", label: "Approved", group: "status" },
  { id: "REJECTED", label: "Rejected", group: "status" },
];

export function filterTabToQuery(tab: UserFilterTab): { role: string; status: string } {
  switch (tab) {
    case "STUDENT":
      return { role: "STUDENT", status: "ALL" };
    case "FACULTY":
      return { role: "FACULTY", status: "ALL" };
    case "ADMIN":
      return { role: "ADMIN", status: "ALL" };
    case "PENDING":
      return { role: "ALL", status: "PENDING" };
    case "APPROVED":
      return { role: "ALL", status: "APPROVED" };
    case "REJECTED":
      return { role: "ALL", status: "REJECTED" };
    default:
      return { role: "ALL", status: "ALL" };
  }
}

export function getFilterTabDescription(tab: UserFilterTab): string {
  switch (tab) {
    case "ALL":
      return "All users ordered students first, then faculty, then admins.";
    case "STUDENT":
      return "Student accounts across all statuses.";
    case "FACULTY":
      return "Faculty accounts with teaching access.";
    case "ADMIN":
      return "Administrator accounts with full system access.";
    case "PENDING":
      return "Accounts awaiting approval.";
    case "APPROVED":
      return "Approved accounts across all roles.";
    case "REJECTED":
      return "Rejected registration requests.";
    default:
      return "";
  }
}

export default function UsersTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
      {tabs.map((tab, index) => (
        <span key={tab.id} className="flex items-center gap-2">
          {index === 4 && (
            <span className="bg-border mx-1 hidden h-6 w-px sm:block" aria-hidden />
          )}
          <MotionButton
            onClick={() => onTabChange(tab.id)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            {tab.label}
          </MotionButton>
        </span>
      ))}
    </div>
  );
}
