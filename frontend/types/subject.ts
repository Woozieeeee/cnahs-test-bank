export interface SectionSubject {
  id: number;

  section: {
    id: number;

    name: string;
  };
}

export interface Subject {
  id: number;

  name: string;

  code: string;

  description?: string;

  createdAt?: string;

  updatedAt?: string;

  isArchived?: boolean;

  faculty?: {
    id: number;

    name: string;
  } | null;

  sectionSubjects: SectionSubject[];
}
