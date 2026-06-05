"use client";

import { useEffect, useState } from "react";

import { getFacultyTopics } from "@/services/faculty_service";

import { FacultyTopic } from "@/types/faculty/facultyTopic";

export default function useFacultyTopics(
  subjectId: number
) {
  const [topics, setTopics] = useState<FacultyTopic[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchTopics = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getFacultyTopics(subjectId);

      setTopics(data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load topics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId) return;

    fetchTopics();
  }, [subjectId]);

  return {
    topics,
    loading,
    error,
    refresh: fetchTopics,
    setTopics,
  };
}
