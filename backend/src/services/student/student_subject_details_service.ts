import { PrismaClient, ExamDifficulty } from "@prisma/client";

const prisma = new PrismaClient();

export interface ExamData {
  id: number;
  title: string;
  description: string | null;
  duration: number;
  totalQuestions: number;
  status: string;
  startsAt: string | null;
  endsAt: string | null;
  passingScore: number;
  hasAttempted?: boolean;
  attemptStatus?: string;
  lastAttemptScore?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  unansweredQuestions?: number;
}

export interface DifficultyTierData {
  difficulty: ExamDifficulty;
  passed: boolean;
  highestScore: number | null;
  passingScore: number;
  exams: ExamData[];
  examCount: number;
  isUnlocked: boolean;
}

export interface SubjectDetailsData {
  id: number;
  name: string;
  code: string;
  description: string | null;
  totalExams: number;
  tiers: Record<ExamDifficulty, DifficultyTierData>;
}

/**
 * Get subject details with all difficulty tiers and exams for a student
 * Can fetch by numeric ID or slug
 */
export const getSubjectDetails = async (
  studentId: number,
  subjectIdOrSlug: number | string
): Promise<SubjectDetailsData | null> => {
  console.log(`[SubjectDetails Service] Fetching for student ${studentId}, subject ${subjectIdOrSlug}`);

  // Verify student exists and get their section
  const student = await prisma.user.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      sectionId: true,
      section: {
        select: {
          sectionSubjects: {
            select: { subjectId: true },
          },
        },
      },
    },
  });

  console.log("[SubjectDetails Service] Student query result:", { 
    studentExists: !!student, 
    sectionId: student?.sectionId,
    sectionSubjectsCount: student?.section?.sectionSubjects?.length 
  });

  if (!student) {
    console.error(`[SubjectDetails Service] Student ${studentId} not found`);
    return null;
  }

  // Get subject by ID or slug
  const subject = await prisma.subject.findUnique({
    where: 
      typeof subjectIdOrSlug === 'number' 
        ? { id: subjectIdOrSlug }
        : { slug: subjectIdOrSlug },
    select: { id: true },
  });

  if (!subject) {
    console.error(`[SubjectDetails Service] Subject ${subjectIdOrSlug} not found`);
    return null;
  }

  const subjectId = subject.id;

  // Check if subject is in student's section
  const hasAccess =
    !!student.sectionId &&
    !!student.section?.sectionSubjects &&
    student.section.sectionSubjects.some((ss) => ss.subjectId === subjectId);

  console.log("[SubjectDetails Service] Access check:", {
    hasSectionId: !!student.sectionId,
    hasSectionSubjects: !!student.section?.sectionSubjects,
    hasAccess,
  });

  if (!hasAccess) {
    console.error(
      `[SubjectDetails Service] Student ${studentId} does not have access to subject ${subjectId}`
    );
    return null;
  }

  // Get subject with all details
  const fullSubject = await prisma.subject.findUnique({
    where: { id: subjectId },
    include: {
      exams: {
        where: { isArchived: false },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          totalQuestions: true,
          difficulty: true,
          status: true,
          startsAt: true,
          endsAt: true,
          passingScore: true,
        },
      },
      difficultyThresholds: true,
    },
  });

  console.log("[SubjectDetails Service] Subject query result:", {
    subjectExists: !!fullSubject,
    examsCount: fullSubject?.exams?.length,
    thresholdsCount: fullSubject?.difficultyThresholds?.length,
  });

  if (!fullSubject) {
    console.error(`[SubjectDetails Service] Subject ${subjectId} not found`);
    return null;
  }

  // Get student's exam attempts for this subject with answer details
  const examAttempts = await prisma.examAttempt.findMany({
    where: {
      studentId,
      exam: {
        subjectId,
        isArchived: false,
      },
    },
    select: {
      examId: true,
      score: true,
      status: true,
      answers: {
        select: {
          isCorrect: true,
        },
      },
    },
  });

  console.log("[SubjectDetails Service] Exam attempts found:", examAttempts.length);

  // Build highest score map by exam
  const highestScoreByExam = new Map<number, number>();
  examAttempts.forEach((attempt) => {
    const current = highestScoreByExam.get(attempt.examId);
    if (current === undefined || attempt.score > current) {
      highestScoreByExam.set(attempt.examId, attempt.score);
    }
  });

  // Calculate highest score per difficulty
  const highestScoreByDifficulty = new Map<ExamDifficulty, number>();
  fullSubject.exams.forEach((exam: any) => {
    const examHighestScore = highestScoreByExam.get(exam.id);
    if (examHighestScore !== undefined) {
      const current = highestScoreByDifficulty.get(exam.difficulty);
      if (current === undefined || examHighestScore > current) {
        highestScoreByDifficulty.set(exam.difficulty, examHighestScore);
      }
    }
  });

  console.log("[SubjectDetails Service] Highest scores by difficulty:", Object.fromEntries(highestScoreByDifficulty));

  // Determine which tiers are passed
  const tierPassed = new Map<ExamDifficulty, boolean>();
  const difficulties: ExamDifficulty[] = [
    "EASY",
    "MEDIUM",
    "HARD",
    "EXPERT",
  ];

  difficulties.forEach((difficulty) => {
    const threshold = fullSubject.difficultyThresholds.find(
      (t: any) => t.difficulty === difficulty
    );
    const passingScore = threshold?.passingScore || 75;
    const highestScore = highestScoreByDifficulty.get(difficulty);
    const passed = highestScore !== undefined && highestScore >= passingScore;
    tierPassed.set(difficulty, passed);
    console.log(`[SubjectDetails Service] Tier ${difficulty}: passed=${passed}, score=${highestScore}, threshold=${passingScore}`);
  });

  // Determine unlock status for each tier
  const isUnlocked = new Map<ExamDifficulty, boolean>();
  isUnlocked.set("EASY", true); // EASY is always unlocked
  isUnlocked.set("MEDIUM", tierPassed.get("EASY") || false);
  isUnlocked.set("HARD", tierPassed.get("MEDIUM") || false);
  isUnlocked.set("EXPERT", tierPassed.get("HARD") || false);

  // Build tier data
  const tiers: Record<ExamDifficulty, DifficultyTierData> = {} as Record<
    ExamDifficulty,
    DifficultyTierData
  >;

  difficulties.forEach((difficulty) => {
    const threshold = fullSubject.difficultyThresholds.find(
      (t: any) => t.difficulty === difficulty
    );
    const passingScore = threshold?.passingScore || 75;

    const examsInTier = fullSubject.exams.filter(
      (exam: any) => exam.difficulty === difficulty
    );

    const exams: ExamData[] = examsInTier.map((exam: any) => {
      const attemptData = examAttempts.find((a) => a.examId === exam.id);
      
      // Calculate right/wrong/unanswered counts
      let correctAnswers = 0;
      let wrongAnswers = 0;
      let unansweredQuestions = 0;

      if (attemptData && attemptData.answers) {
        correctAnswers = attemptData.answers.filter((a) => a.isCorrect).length;
        wrongAnswers = attemptData.answers.filter((a) => !a.isCorrect).length;
        unansweredQuestions = exam.totalQuestions - attemptData.answers.length;
      } else {
        unansweredQuestions = exam.totalQuestions;
      }

      return {
        id: exam.id,
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
        totalQuestions: exam.totalQuestions,
        status: exam.status,
        startsAt: exam.startsAt ? new Date(exam.startsAt).toISOString() : null,
        endsAt: exam.endsAt ? new Date(exam.endsAt).toISOString() : null,
        passingScore: exam.passingScore,
        hasAttempted: examAttempts.some((a) => a.examId === exam.id),
        attemptStatus: attemptData?.status || undefined,
        lastAttemptScore: attemptData?.score || undefined,
        correctAnswers: attemptData ? correctAnswers : undefined,
        wrongAnswers: attemptData ? wrongAnswers : undefined,
        unansweredQuestions: attemptData ? unansweredQuestions : undefined,
      };
    });

    tiers[difficulty] = {
      difficulty,
      passed: tierPassed.get(difficulty) || false,
      highestScore: highestScoreByDifficulty.get(difficulty) || null,
      passingScore,
      exams,
      examCount: exams.length,
      isUnlocked: isUnlocked.get(difficulty) || false,
    };
  });

  const result = {
    id: fullSubject.id,
    name: fullSubject.name,
    code: fullSubject.code,
    description: fullSubject.description,
    totalExams: fullSubject.exams.length,
    tiers,
  };

  console.log("[SubjectDetails Service] Returning result with tiers:", Object.keys(result.tiers));

  return result;
};
