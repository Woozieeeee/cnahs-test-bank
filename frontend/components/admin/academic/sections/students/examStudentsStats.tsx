import { memo } from "react";

import InfoCard from "@/components/common/cards/infoCard";
import InfoCardHeader from "@/components/common/cards/infoCardHeader";
import InfoCardValue from "@/components/common/cards/infoCardValue";

interface Props {
  total: number;

  active: number;

  finished: number;

  flagged: number;
}

function ExamStudentsStats({
  total,
  active,
  finished,
  flagged,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <InfoCard>
        <InfoCardHeader label="Total Sessions" />

        <InfoCardValue className="text-3xl font-bold">
          {total}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Active" />

        <InfoCardValue className="text-3xl font-bold">
          {active}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Finished" />

        <InfoCardValue className="text-3xl font-bold">
          {finished}
        </InfoCardValue>
      </InfoCard>

      <InfoCard>
        <InfoCardHeader label="Flagged" />

        <InfoCardValue className="text-3xl font-bold">
          {flagged}
        </InfoCardValue>
      </InfoCard>
    </div>
  );
}

export default memo(ExamStudentsStats);
