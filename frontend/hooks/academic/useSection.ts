"use client";

import { useCallback, useEffect, useState } from "react";

import { getSectionById } from "@/services/academic_service";

import type { Section } from "@/types/academic/section";

export default function useSection(id: number) {
  const [section, setSection] = useState<Section | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);

      setError(null);

      const data = await getSectionById(id);

      setSection(data);
    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Failed to load section."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    section,
    loading,
    error,
    refresh,
  };
}
