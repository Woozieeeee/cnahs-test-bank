"use client";

import { useParams } from "next/navigation";

export default function useSectionId() {
  const params = useParams();

  return Number(params.id);
}
