import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

function ModalSectionTitle({ children }: Props) {
  return (
    <h3 className="text-foreground text-sm font-semibold">
      {children}
    </h3>
  );
}

export default memo(ModalSectionTitle);
