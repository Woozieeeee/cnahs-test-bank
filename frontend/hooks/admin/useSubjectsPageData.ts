import { useEffect, useMemo, useState } from "react";
import { getSubjects, getSections } from "@/services/academic_service";
import { getFacultyUsers } from "@/services/admin_service";
import type { Subject } from "@/types/academic/subject";
import type { Section } from "@/types/academic/section";

interface Faculty {
  id: number;
  name: string;
}

interface UseSubjectsPageDataReturn {
  // State
  subjects: Subject[];
  facultyUsers: Faculty[];
  sections: Section[];
  initialLoading: boolean;
  search: string;
  assignmentFilter: string;
  filteredSubjects: Subject[];
  // Setters
  setSubjects: (subjects: Subject[]) => void;
  setSearch: (search: string) => void;
  setAssignmentFilter: (filter: string) => void;
  // Methods
  fetchSubjects: () => Promise<void>;
  fetchDependencies: () => Promise<void>;
}

export function useSubjectsPageData(activeTab: string): UseSubjectsPageDataReturn {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [facultyUsers, setFacultyUsers] = useState<Faculty[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [assignmentFilter, setAssignmentFilter] = useState("ALL");

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects(activeTab);
      setSubjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchDependencies = async () => {
    try {
      const [facultyData, sectionData] = await Promise.all([
        getFacultyUsers(),
        getSections(),
      ]);

      setFacultyUsers(facultyData);
      setSections(sectionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [activeTab]);

  useEffect(() => {
    fetchDependencies();
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch =
        subject.name.toLowerCase().includes(search.toLowerCase()) ||
        subject.code.toLowerCase().includes(search.toLowerCase());

      const hasFaculty = (subject.faculties?.length ?? 0) > 0;

      const matchesAssignment =
        assignmentFilter === "ALL"
          ? true
          : assignmentFilter === "ASSIGNED"
          ? hasFaculty
          : !hasFaculty;

      return matchesSearch && matchesAssignment;
    });
  }, [subjects, search, assignmentFilter]);

  return {
    subjects,
    setSubjects,
    facultyUsers,
    sections,
    initialLoading,
    search,
    setSearch,
    assignmentFilter,
    setAssignmentFilter,
    filteredSubjects,
    fetchSubjects,
    fetchDependencies,
  };
}
