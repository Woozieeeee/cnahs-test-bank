import AcademicCard from "./academicCard";

import { academicCards } from "./academicData";

export default function AcademicGrid() {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {academicCards.map((card) => (
        <AcademicCard
          key={card.title}
          title={card.title}
          description={card.description}
          href={card.href}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
