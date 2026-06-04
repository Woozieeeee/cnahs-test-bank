import { memo } from "react";

import CategoryBadge from "@/components/common/badges/categoryBadge";

interface Props {
  categories: string[];
}

function StudentSessionTimelineCategories({
  categories,
}: Props) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryBadge key={category}>
          {category}
        </CategoryBadge>
      ))}
    </div>
  );
}

export default memo(StudentSessionTimelineCategories);
