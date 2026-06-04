"use client";

import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  assignStudentSection,
  getSections,
} from "@/services/academic_service";

import { successToast, errorToast } from "@/lib/swal";

interface Section {
  id: number;

  name: string;
}

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  studentRecordId: number;

  studentName: string;

  onSuccess: () => void;
}

function AssignSectionModal({
  open,
  onOpenChange,
  studentRecordId,
  studentName,
  onSuccess,
}: Props) {
  const [sections, setSections] = useState<Section[]>([]);

  const [sectionId, setSectionId] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH
  // =========================

  const fetchSections = useCallback(async () => {
    try {
      const data = await getSections();

      setSections(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  // =========================
  // ASSIGN
  // =========================

  const handleAssign = useCallback(async () => {
    try {
      setLoading(true);

      await assignStudentSection(
        studentRecordId,
        Number(sectionId)
      );

      successToast("Section assigned successfully.");

      onSuccess();

      onOpenChange(false);
    } catch (error) {
      console.log(error);

      errorToast("Failed to assign section.");
    } finally {
      setLoading(false);
    }
  }, [studentRecordId, sectionId, onSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Section</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">
              Student
            </p>

            <p className="mt-1 font-medium text-slate-900">
              {studentName}
            </p>
          </div>

          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all duration-200 outline-none focus:border-slate-500"
          >
            <option value="">Select section</option>

            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAssign}
            disabled={loading || !sectionId}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign Section"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(AssignSectionModal);
