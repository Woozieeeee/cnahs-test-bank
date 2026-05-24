interface Props {
  activeTab: string;

  setActiveTab: (tab: string) => void;
}

const tabs = [
  "ALL",

  "USER_MANAGEMENT",

  "APPROVALS",

  "EXAM_VIOLATIONS",

  "SECURITY",

  "STUDENT_RECORDS",

  "SYSTEM",
];

export default function ActivityTabs({
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
                ? "bg-black text-white"
                : `
                  bg-white
                  text-slate-600
                  hover:bg-slate-100
                `
            }
          `}
        >
          {tab.replaceAll("_", " ")}
        </button>
      ))}
    </div>
  );
}
