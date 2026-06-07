"use client";

import { useEffect, useState } from "react";

import { getExamSections } from "@/services/faculty_service";

interface Section {
  id: number;
  name: string;
}

export default function useExamSections(subjectId: number) {
  const [sections, setSections] = useState<Section[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getExamSections(subjectId);

        setSections(data);

        setError(null);
      } catch (error: any) {
        setError(
          error?.response?.data?.message ??
            "Failed to load sections."
        );
      } finally {
        setLoading(false);
      }
    };

    if (subjectId) {
      fetchSections();
    }
  }, [subjectId]);

  return {
    sections,
    loading,
    error,
  };
}
