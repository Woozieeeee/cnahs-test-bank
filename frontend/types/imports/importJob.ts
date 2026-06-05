export interface ImportBatch {
  id: number;

  importedRows: number;

  skippedRows: number;

  completedAt?: string | null;
}

export interface ImportJob {
  id: number;

  filename: string;

  status: "PROCESSING" | "COMPLETED" | "FAILED";

  totalRows: number;

  importedRows: number;

  skippedRows: number;

  createdAt: string;

  completedAt?: string | null;

  fileSize?: number | null;

  mimeType?: string | null;

  batches: ImportBatch[];
}
