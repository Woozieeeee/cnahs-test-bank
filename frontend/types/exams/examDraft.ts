export interface ExamDraftData {
  selectedQuestions: number[];

  rules: {
    randomizeQuestions: boolean;

    randomizeOptions: boolean;

    preventCopyPaste: boolean;

    fullscreenRequired: boolean;
  };

  schedule: {
    startsAt: string | null;

    endsAt: string | null;
  };
}

export interface ExamDraft {
  id: number;

  facultyId: number;

  subjectId: number;

  title: string | null;

  currentStep: number;

  draftData: ExamDraftData;

  createdAt: string;

  updatedAt: string;
}
