export interface ActivityLog {
  id: number;

  action: string;

  categories: string[];

  severity: string;

  description?: string;

  performedBy: string;

  targetUser?: string;

  createdAt: string;

  metadata?: Record<string, unknown>;
}
