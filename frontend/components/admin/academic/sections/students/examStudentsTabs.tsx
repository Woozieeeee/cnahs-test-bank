interface Props {
  activeTab: string;

  setActiveTab: (tab: string) => void;
}

const tabs = [
  "ALL",
  "ACTIVE",
  "FINISHED",
  "ABSENT",
  "TERMINATED",
  "FLAGGED",
];

export default function ExamStudentsTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div
      className="
        flex
        flex-wrap
        gap-2
      "
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            rounded-xl
            px-4
            py-2
            text-sm
            font-medium
            transition

            ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
