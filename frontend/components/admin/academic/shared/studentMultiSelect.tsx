"use client";

import {
  memo,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";

import { Loader2, CheckCircle2, XCircle, Users, Search } from "lucide-react";

import { getStudentRecords } from "@/services/academic_service";

interface Student {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  program: string;
  sectionId: number | null;
  sectionName: string | null;
  section: any | null;
}

interface Props {
  sectionId: number;
  selectedStudents: number[];
  setSelectedStudents: (value: number[]) => void;
  onStudentsLoaded?: (students: Student[]) => void;
  onSelectedTypeChange?: (type: "assign" | "unassign" | null) => void;
}

interface Tab {
  id: "assigned" | "unassigned";
  label: string;
  icon: React.ElementType;
}

function StudentMultiSelect({
  sectionId,
  selectedStudents,
  setSelectedStudents,
  onStudentsLoaded,
  onSelectedTypeChange,
}: Props) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab["id"]>("unassigned");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await getStudentRecords();
        console.log("=== FETCHING STUDENTS ===");
        
        let studentList: Student[] = Array.isArray(response) ? response : [];
        
        studentList = studentList.map((s) => ({
          ...s,
          sectionName: s.section?.name || null,
        }));
        
        console.log("Student count:", studentList.length);
        
        setStudents(studentList);
        
        if (onStudentsLoaded) {
          onStudentsLoaded(studentList);
        }
        
        setError(null);
      } catch (err) {
        console.error("=== FETCH ERROR ===");
        console.error("Failed to fetch students:", err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const assignedStudents = useMemo(() => {
    return students.filter(
      (student) => student.sectionId === sectionId
    );
  }, [students, sectionId]);

  const unassignedStudents = useMemo(() => {
    return students.filter(
      (student) => student.sectionId === null
    );
  }, [students]);

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase();
    const source = activeTab === "assigned" ? assignedStudents : unassignedStudents;

    return source.filter((student) => {
      const fullName =
        `${student.firstName} ${student.lastName}`.toLowerCase();
      const studentId = student.studentId.toLowerCase();

      return fullName.includes(query) || studentId.includes(query);
    });
  }, [search, activeTab, assignedStudents, unassignedStudents]);

  const selectedType = useMemo(() => {
    if (selectedStudents.length === 0) return null;
    
    const hasAssignedStudents = selectedStudents.some((id) => {
      const student = students.find((s) => s.id === id);
      return student && student.sectionId === sectionId;
    });
    
    if (hasAssignedStudents) {
      return "unassign";
    }
    return "assign";
  }, [selectedStudents, students, sectionId]);

  useEffect(() => {
    if (onSelectedTypeChange) {
      onSelectedTypeChange(selectedType);
    }
  }, [selectedType, onSelectedTypeChange]);

  const allVisibleSelected = useMemo(() => {
    if (filteredStudents.length === 0) return false;
    return filteredStudents.every((s) => selectedStudents.includes(s.id));
  }, [filteredStudents, selectedStudents]);

  const toggleAll = useCallback(() => {
    if (allVisibleSelected) {
      const idsToDeselect = filteredStudents.map((s) => s.id);
      setSelectedStudents(
        selectedStudents.filter((id) => !idsToDeselect.includes(id))
      );
    } else {
      const idsToSelect = filteredStudents.map((s) => s.id);
      setSelectedStudents([...selectedStudents, ...idsToSelect]);
    }
  }, [allVisibleSelected, filteredStudents, selectedStudents, setSelectedStudents]);

  const toggleStudent = useCallback(
    (studentId: number, studentName: string, currentSectionName: string | null) => {
      console.log("=== TOGGLE STUDENT ===");
      console.log("Student ID:", studentId);
      console.log("Student Name:", studentName);
      console.log("Current Section:", currentSectionName);

      const exists = selectedStudents.includes(studentId);

      if (exists) {
        setSelectedStudents(
          selectedStudents.filter((id) => id !== studentId)
        );
      } else {
        setSelectedStudents([...selectedStudents, studentId]);
      }
    },
    [selectedStudents, setSelectedStudents]
  );

  const selectedStudentData = useMemo(() => {
    return students.filter((student) =>
      selectedStudents.includes(student.id)
    );
  }, [students, selectedStudents]);

  if (loading) {
    return (
      <div className="border-input bg-background text-foreground rounded-xl border p-8 text-center">
        <Loader2 className="mx-auto animate-spin" size={24} />
        <p className="mt-2 text-sm text-gray-500">
          Loading students...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-destructive bg-destructive/10 text-destructive rounded-xl border p-4 text-sm">
        {error}
      </div>
    );
  }

  const tabs: Tab[] = [
    { id: "assigned", label: "Assigned", icon: CheckCircle2 },
    { id: "unassigned", label: "Unassigned", icon: Users },
  ];

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 border-b border-border">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const count = tab.id === "assigned" ? assignedStudents.length : unassignedStudents.length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {tab.label}
              <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder={`Search ${activeTab} students...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-input bg-background text-foreground pl-10 focus:border-ring focus:ring-ring/20 w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2"
        />
      </div>

      {filteredStudents.length > 0 && (
        <button
          onClick={toggleAll}
          className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            allVisibleSelected
              ? "bg-red-50 text-red-700 hover:bg-red-100"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
          }`}
        >
          {allVisibleSelected ? (
            <>
              <XCircle size={16} />
              Deselect All
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              Select All
            </>
          )}
        </button>
      )}

      {selectedStudentData.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground font-medium">
            {selectedType === "unassign" ? "To Unassign" : "To Assign"} ({selectedStudentData.length}):
          </span>
          {selectedStudentData.map((student) => (
            <button
              key={student.id}
              onClick={() => toggleStudent(student.id, `${student.firstName} ${student.lastName}`, student.sectionName)}
              className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium hover:opacity-80 transition-opacity"
            >
              {student.firstName} {student.lastName} ✕
            </button>
          ))}
        </div>
      )}

      <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
        {filteredStudents.length === 0 ? (
          <div className="border-border bg-muted/40 text-muted-foreground rounded-xl border border-dashed p-6 text-center text-sm">
            {search ? "No students found." : "No students available."}
          </div>
        ) : (
          filteredStudents.map((student) => {
            const selected = selectedStudents.includes(student.id);

            console.log("Rendering student:", {
              id: student.id,
              studentId: student.studentId,
              firstName: student.firstName,
              lastName: student.lastName,
              sectionId: student.sectionId,
              sectionName: student.sectionName,
              selected: selected,
            });

            return (
              <button
                key={student.id}
                onClick={() => toggleStudent(student.id, `${student.firstName} ${student.lastName}`, student.sectionName)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary/10 hover:bg-primary/20"
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {student.studentId} • {student.program}
                  </p>
                </div>

                <div
                  className={`h-5 w-5 flex-shrink-0 rounded-full border flex items-center justify-center ${
                    selected
                      ? "border-primary bg-primary text-white"
                      : "border-border"
                  }`}
                >
                  {selected && <CheckCircle2 size={14} />}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default memo(StudentMultiSelect);
