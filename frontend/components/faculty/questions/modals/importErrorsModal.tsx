"use client";

import ModalContainer from "@/components/common/modal/modalContainer";

import ModalHeader from "@/components/common/modal/modalHeader";

import EmptyState from "@/components/common/states/emptyState";

interface Props {
  open: boolean;

  details: any;

  onClose: () => void;
}

export default function ImportErrorsModal({
  open,
  details,
  onClose,
}: Props) {
  const errors = details?.errorReport || [];

  return (
    <ModalContainer open={open} maxWidth="max-w-4xl">
      <ModalHeader
        title="Import Errors"
        description="Review skipped rows and validation issues."
        onClose={onClose}
      />

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="border-border rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">
              Imported
            </p>

            <p className="text-xl font-semibold">
              {details?.importedRows ?? 0}
            </p>
          </div>

          <div className="border-border rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">
              Skipped
            </p>

            <p className="text-xl font-semibold">
              {details?.skippedRows ?? 0}
            </p>
          </div>

          <div className="border-border rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">
              Total
            </p>

            <p className="text-xl font-semibold">
              {details?.totalRows ?? 0}
            </p>
          </div>
        </div>

        {errors.length === 0 ? (
          <EmptyState
            title="No errors"
            description="This import completed successfully."
          />
        ) : (
          <div className="border-border max-h-[400px] overflow-auto rounded-xl border">
            {errors.map((error: string, index: number) => (
              <div
                key={index}
                className="border-border border-b p-3 text-sm"
              >
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
