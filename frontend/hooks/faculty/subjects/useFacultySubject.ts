"use client";

import { useEffect, useState } from "react";

import { getFacultySubjectById } from "@/services/faculty_service";

import { FacultySubjectDetails } from "@/types/faculty/facultySubjectDetails";

export default function useFacultySubject(
  subjectId: number
) {
  const [subject, setSubject] =
    useState<FacultySubjectDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchSubject = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getFacultySubjectById(subjectId);

      setSubject(data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load subject."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subjectId) return;

    fetchSubject();
  }, [subjectId]);

  return {
    subject,
    loading,
    error,
    refresh: fetchSubject,
  };
}
