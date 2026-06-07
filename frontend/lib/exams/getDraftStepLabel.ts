export function getDraftStepLabel(step: number): string {
  switch (step) {
    case 1:
      return "Question Builder";

    case 2:
      return "Exam Rules";

    case 3:
      return "Exam Information";

    case 4:
      return "Review & Publish";

    default:
      return `Step ${step}`;
  }
}
