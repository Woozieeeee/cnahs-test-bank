export interface ImportJob {
  id: number;

  filename: string;

  status: "PROCESSING" | "COMPLETED" | "FAILED";

  totalRows: number;

  importedRows: number;

  skippedRows: number;

  createdAt: string;
}
