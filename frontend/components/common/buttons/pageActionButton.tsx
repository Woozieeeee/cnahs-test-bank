import { memo } from "react";

import MotionButton from "@/components/motion/motionButton";

interface Props {
  children: React.ReactNode;

  onClick: () => void;
}

function PageActionButton({ children, onClick }: Props) {
  return (
    <MotionButton
      onClick={onClick}
      className="bg-card text-foreground hover:bg-muted rounded-xl px-4 py-2 font-medium transition-all duration-200"
    >
      {children}
    </MotionButton>
  );
}

export default memo(PageActionButton);
