import prisma from "../../lib/prisma";

export interface ExamQuestionData {
  id: number;
  text: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
  options: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}

export interface ExamConfigData {
  randomizeQuestions: boolean;
  randomizeAnswers: boolean;
  showResultAfterSubmission: boolean;
  showCorrectAnswers: boolean;
  showExplanations: boolean;
  requireFullscreen: boolean;
  detectTabSwitch: boolean;
  detectWindowBlur: boolean;
  blockCopy: boolean;
  blockPaste: boolean;
  blockRightClick: boolean;
  detectDeviceChange: boolean;
  violationThreshold: number;
  thresholdAction: "AUTO_SUBMIT" | "END_EXAM" | "FLAG_REVIEW";
}

export interface ExamDataResponse {
  id: number;
  title: string;
  description: string | null;
  totalQuestions: number;
  duration: number;
  passingScore: number;
  questions: ExamQuestionData[];
  config: ExamConfigData;
  startsAt: Date | null;
  endsAt: Date | null;
}

/**
 * Get exam details with all questions and faculty-configured settings
 * Used by students to load exam data before starting
 */
export async function getExamData(examId: number): Promise<ExamDataResponse | null> {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        examQuestions: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    if (!exam) {
      return null;
    }

    // Transform questions to match frontend interface
    const questions: ExamQuestionData[] = exam.examQuestions.map((eq: any) => {
      const question = eq.question;
      
      // Determine question type based on options
      let type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER" = "MULTIPLE_CHOICE";
      if (question.options.length === 2) {
        // Check if it's a true/false question
        const optionTexts = question.options.map((o: any) => o.optionText.toLowerCase());
        if (
          (optionTexts.includes("true") && optionTexts.includes("false")) ||
          (optionTexts.includes("yes") && optionTexts.includes("no"))
        ) {
          type = "TRUE_FALSE";
        }
      }

      return {
        id: question.id,
        text: question.question,
        type,
        options: question.options.map((opt: any) => opt.optionText),
        difficulty: question.difficulty as "EASY" | "MEDIUM" | "HARD" | "EXPERT",
      };
    });

    // Build config object from exam settings
    const config: ExamConfigData = {
      randomizeQuestions: exam.randomizeQuestions,
      randomizeAnswers: exam.randomizeOptions,
      showResultAfterSubmission: exam.showResultAfterSubmission,
      showCorrectAnswers: exam.showCorrectAnswers,
      showExplanations: exam.showExplanations,
      requireFullscreen: exam.requireFullscreen,
      detectTabSwitch: exam.detectTabSwitch,
      detectWindowBlur: exam.detectWindowBlur,
      blockCopy: exam.blockCopy,
      blockPaste: exam.blockPaste,
      blockRightClick: exam.blockRightClick,
      detectDeviceChange: exam.detectDeviceChange,
      violationThreshold: exam.violationThreshold,
      thresholdAction: exam.thresholdAction as "AUTO_SUBMIT" | "END_EXAM" | "FLAG_REVIEW",
    };

    return {
      id: exam.id,
      title: exam.title,
      description: exam.description,
      totalQuestions: exam.totalQuestions,
      duration: exam.duration,
      passingScore: exam.passingScore,
      questions,
      config,
      startsAt: exam.startsAt,
      endsAt: exam.endsAt,
    };
  } catch (error) {
    console.error("[ExamService] Error fetching exam data:", error);
    throw error;
  }
}
