export interface ImportBatchDetails {
  id: number;

  filename: string;

  totalRows: number;

  importedRows: number;

  skippedRows: number;

  createdAt: string;

  completedAt?: string | null;
}

export interface ImportJobDetails {
  id: number;

  filename: string;

  status: "PROCESSING" | "COMPLETED" | "FAILED";

  totalRows: number;

  importedRows: number;

  skippedRows: number;

  fileSize?: number | null;

  mimeType?: string | null;

  createdAt: string;

  completedAt?: string | null;

  errorReport: string[] | null;

  batches: ImportBatchDetails[];
}
