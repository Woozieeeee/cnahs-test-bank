"use client";

import { useParams } from "next/navigation";

export default function useExamId() {
  const params = useParams();

  return Number(params.examId);
}
