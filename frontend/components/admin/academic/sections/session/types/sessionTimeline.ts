export interface SessionTimelineEvent {
  id: number;

  title: string;

  description: string;

  time: Date;

  severity: "INFO" | "WARNING" | "ERROR";

  categories: string[];

  createdAt: string;
}
