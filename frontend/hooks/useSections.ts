"use client";

import { useCallback, useEffect, useState } from "react";

import { getSections } from "@/services/academic_service";

import type { Section } from "@/types/section";

export default function useSections() {
  const [sections, setSections] = useState<Section[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getSections();

      setSections(data);
    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Failed to load sections."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    sections,
    loading,
    error,
    refresh,
  };
}
