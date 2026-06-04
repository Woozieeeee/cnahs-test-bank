import { memo } from "react";

import InfoCard from "./infoCard";

interface Props {
  title: string;

  description: string;
}

function InfoCardSection({ title, description }: Props) {
  return (
    <InfoCard>
      <h3 className="text-foreground text-sm font-semibold">
        {title}
      </h3>

      <p className="text-muted-foreground mt-3 text-sm leading-7">
        {description}
      </p>
    </InfoCard>
  );
}

export default memo(InfoCardSection);
