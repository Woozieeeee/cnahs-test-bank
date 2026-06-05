"use client";

import ModalContainer from "@/components/common/modal/modalContainer";
import ModalHeader from "@/components/common/modal/modalHeader";

import EmptyState from "@/components/common/states/emptyState";

import MotionButton from "@/components/motion/motionButton";

import { ImportJob } from "@/types/importJob";

import { formatFileSize } from "@/lib/formatFileSize";

interface Props {
  open: boolean;

  history: ImportJob[];

  onClose: () => void;

  onViewErrors?: (jobId: number) => void;
}

export default function ImportHistoryModal({
  open,
  history,
  onClose,
  onViewErrors,
}: Props) {
  return (
    <ModalContainer open={open} maxWidth="max-w-7xl">
      <ModalHeader
        title="Import History"
        description="Review previous CSV imports and processing results."
        onClose={onClose}
      />

      {history.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No import history"
            description="No CSV uploads have been recorded yet."
          />
        </div>
      ) : (
        <div className="mt-6 max-h-[650px] overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-card sticky top-0 z-10">
              <tr className="border-border border-b">
                <th className="p-3 text-left">File</th>

                <th className="p-3 text-left">Status</th>

                <th className="p-3 text-center">Total</th>

                <th className="p-3 text-center">
                  Imported
                </th>

                <th className="p-3 text-center">Skipped</th>

                <th className="p-3 text-left">Uploaded</th>

                <th className="p-3 text-left">Completed</th>

                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {history.map((job) => (
                <tr
                  key={job.id}
                  className="border-border hover:bg-muted/30 border-b transition"
                >
                  <td className="p-3">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {job.filename}
                      </p>

                      <div className="text-muted-foreground flex flex-wrap gap-2 text-xs">
                        <span>
                          {formatFileSize(job.fileSize)}
                        </span>

                        {job.mimeType && (
                          <>
                            <span>•</span>

                            <span>{job.mimeType}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        job.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : job.status === "FAILED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    {job.totalRows}
                  </td>

                  <td className="p-3 text-center font-medium text-green-600">
                    {job.importedRows}
                  </td>

                  <td className="p-3 text-center font-medium text-red-600">
                    {job.skippedRows}
                  </td>

                  <td className="p-3">
                    <div className="text-xs">
                      {new Date(
                        job.createdAt
                      ).toLocaleString()}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="text-xs">
                      {job.completedAt
                        ? new Date(
                            job.completedAt
                          ).toLocaleString()
                        : "-"}
                    </div>
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      {job.skippedRows > 0 && (
                        <MotionButton
                          onClick={() =>
                            onViewErrors?.(job.id)
                          }
                          className="border-border rounded-lg border px-3 py-1 text-xs"
                        >
                          View Errors
                        </MotionButton>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ModalContainer>
  );
}
