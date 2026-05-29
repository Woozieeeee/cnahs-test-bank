interface Props {
  activeTab: string;

  setActiveTab: (tab: string) => void;
}

const tabs = ["ALL", "ACTIVE", "ARCHIVED"];

export default function SectionsTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="flex gap-2">
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
                ? `
                  bg-primary
                  text-primary-foreground
                `
                : `
                  bg-card
                  text-muted-foreground
                  hover:bg-muted
                `
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
