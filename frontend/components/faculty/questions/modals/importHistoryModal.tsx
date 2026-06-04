"use client";

import ModalHeader from "@/components/common/modal/modalHeader";

import { ImportJob } from "@/types/importJob";

interface Props {
  open: boolean;

  history: ImportJob[];

  onClose: () => void;
}

export default function ImportHistoryModal({
  open,
  history,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card border-border w-full max-w-4xl rounded-2xl border p-6">
        <ModalHeader
          title="Import History"
          description="View previous CSV uploads."
          onClose={onClose}
        />

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b">
                <th className="p-3 text-left">File</th>

                <th className="p-3 text-left">Status</th>

                <th className="p-3 text-left">Imported</th>

                <th className="p-3 text-left">Skipped</th>

                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((job) => (
                <tr
                  key={job.id}
                  className="border-border border-b"
                >
                  <td className="p-3">{job.filename}</td>

                  <td className="p-3">{job.status}</td>

                  <td className="p-3">
                    {job.importedRows}
                  </td>

                  <td className="p-3">{job.skippedRows}</td>

                  <td className="p-3">
                    {new Date(
                      job.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
