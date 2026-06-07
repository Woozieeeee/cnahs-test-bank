import { ACTIVITY_CATEGORIES } from "@/lib/constants/activity";

interface Props {
  activeTab: string;

  setActiveTab: (tab: string) => void;

  categories?: readonly string[];
}

export default function ActivityTabs({
  activeTab,
  setActiveTab,
  categories = ACTIVITY_CATEGORIES,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveTab(category)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === category
              ? "bg-primary text-primary-foreground"
              : `bg-card text-muted-foreground hover:bg-muted hover:text-foreground`
          } `}
        >
          {category.replaceAll("_", " ")}
        </button>
      ))}
    </div>
  );
}
