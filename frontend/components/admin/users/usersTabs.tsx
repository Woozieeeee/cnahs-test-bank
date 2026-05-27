import MotionButton from "@/components/motion/motionButton";

interface Props {
  activeTab: string;

  setActiveTab: (tab: string) => void;
}

export default function UsersTabs({
  activeTab,
  setActiveTab,
}: Props) {
  const tabs = ["ALL", "PENDING", "APPROVED", "REJECTED"];

  return (
    <div
      className="
        flex
        gap-3
        overflow-x-auto
      "
    >
      {tabs.map((tab) => (
        <MotionButton
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            rounded-full
            px-5
            py-2
            text-sm
            font-medium
            transition
            cursor-pointer
            
            ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }
          `}
        >
          {tab}
        </MotionButton>
      ))}
    </div>
  );
}
