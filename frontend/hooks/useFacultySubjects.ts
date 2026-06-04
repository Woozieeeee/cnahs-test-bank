"use client";

import { useEffect, useState } from "react";

import { getFacultySubjects } from "@/services/faculty_service";

import { FacultySubject } from "@/types/facultySubject";

export default function useFacultySubjects() {
  const [subjects, setSubjects] = useState<
    FacultySubject[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const data = await getFacultySubjects();

      setSubjects(data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load subjects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return {
    subjects,
    loading,
    error,
    refresh: fetchSubjects,
  };
}
