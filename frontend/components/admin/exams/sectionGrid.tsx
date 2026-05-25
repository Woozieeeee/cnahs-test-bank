import SectionCard from "./sectionCard";

const sections = [
  {
    id: 1,

    name: "Nursing 4A",

    students: 42,

    ongoingExam: true,

    violations: 3,

    suspicious: 1,
  },

  {
    id: 2,

    name: "Nursing 3B",

    students: 38,

    ongoingExam: false,

    violations: 0,

    suspicious: 0,
  },

  {
    id: 3,

    name: "Nursing 2A",

    students: 35,

    ongoingExam: true,

    violations: 7,

    suspicious: 2,
  },
];

export default function SectionGrid() {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {sections.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
