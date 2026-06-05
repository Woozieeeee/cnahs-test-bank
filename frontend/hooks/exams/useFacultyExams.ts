"use client";

import { useEffect, useState } from "react";

import { getFacultyExams } from "@/services/faculty_service";

import { FacultyExam } from "@/types/exams/facultyExam";

export default function useFacultyExams() {
  const [exams, setExams] = useState<FacultyExam[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchExams = async () => {
    try {
      setLoading(true);

      const data = await getFacultyExams();

      setExams(data);

      setError(null);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to fetch exams."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return {
    exams,

    loading,

    error,

    refresh: fetchExams,
  };
}
