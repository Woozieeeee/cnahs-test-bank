import { PrismaClient, ExamDifficulty } from "@prisma/client";

const prisma = new PrismaClient();

export interface DashboardStats {
  totalSubjects: number;
  activeSubjects: number;
  completedSubjects: number;
  overallProgress: number;
}

export interface SubjectCardData {
  id: number;
  slug: string;
  name: string;
  code: string;
  progress: number; // percentage of tiers completed
  currentTier: ExamDifficulty;
  nextUnlock: ExamDifficulty | null;
  examsAvailable: number;
  status: "IN_PROGRESS" | "COMPLETED" | "LOCKED" | "STAND_BY";
  easyPassed: boolean;
  mediumPassed: boolean;
  hardPassed: boolean;
  expertPassed: boolean;
}

export interface StudentDashboardData {
  stats: DashboardStats;
  subjects: SubjectCardData[];
}

/**
 * Get student dashboard data with all subjects, progress, and stats
 */
export const getStudentDashboard = async (
  studentId: number
): Promise<StudentDashboardData> => {
  // Get the student's section
  const student = await prisma.user.findUnique({
    where: { id: studentId },
    include: {
      section: {
        include: {
          sectionSubjects: {
            include: {
              subject: {
                include: {
                  exams: {
                    where: { isArchived: false },
                    select: { id: true, difficulty: true, status: true, startsAt: true, endsAt: true },
                  },
                  difficultyThresholds: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Get all enrolled subjects for the student (direct enrollments)
  const directEnrollments = await prisma.subjectEnrollment.findMany({
    where: { studentId },
    include: {
      subject: {
        include: {
          exams: {
            where: { isArchived: false },
            select: { id: true, difficulty: true, status: true, startsAt: true, endsAt: true },
          },
          difficultyThresholds: true,
        },
      },
    },
  });

  // Combine: subjects from section + direct enrollments
  const sectionSubjects = student?.section?.sectionSubjects.map((ss: any) => ({
    subject: ss.subject,
  })) || [];
  
  // Create a unique list of subjects (avoid duplicates)
  const allEnrollments = [
    ...sectionSubjects,
    ...directEnrollments,
  ];
  
  const uniqueSubjectIds = new Set(
    allEnrollments.map((e: any) => e.subject.id)
  );
  
  const enrollments = allEnrollments.filter((e: any) => {
    if (uniqueSubjectIds.has(e.subject.id)) {
      uniqueSubjectIds.delete(e.subject.id);
      return true;
    }
    return false;
  });

  // Get student's progress in each subject
  const subjectProgressList = await prisma.subjectProgress.findMany({
    where: { studentId },
  });

  // Get exam attempts to calculate highest scores per difficulty per subject
  const examAttempts = await prisma.examAttempt.findMany({
    where: { studentId, exam: { isArchived: false } },
    include: {
      exam: {
        select: { id: true, difficulty: true, subjectId: true },
      },
    },
  });

  // Build a map of subject progress
  const progressMap = new Map(
    subjectProgressList.map((p: any) => [p.subjectId, p])
  );

  // Calculate highest scores per difficulty per subject
  const scoresBySubjectDifficulty = new Map<
    string,
    { highest: number; passed: boolean }
  >();

  examAttempts.forEach((attempt: any) => {
    const key = `${attempt.exam.subjectId}-${attempt.exam.difficulty}`;
    const current = scoresBySubjectDifficulty.get(key);
    const newScore = attempt.score;
    const thresholdEntry = enrollments
      .find((e: any) => e.subject.id === attempt.exam.subjectId)
      ?.subject.difficultyThresholds.find(
        (t: any) => t.difficulty === attempt.exam.difficulty
      );
    const threshold = thresholdEntry?.passingScore || 75;
    const passed = newScore >= threshold;

    if (!current || newScore > current.highest) {
      scoresBySubjectDifficulty.set(key, {
        highest: newScore,
        passed,
      });
    }
  });

  // Build subject cards
  const subjectCards: SubjectCardData[] = enrollments.map((enrollment: any) => {
    const subject = enrollment.subject;
    const progress = progressMap.get(subject.id);

    // Calculate tier passage status
    const easyKey = `${subject.id}-EASY`;
    const mediumKey = `${subject.id}-MEDIUM`;
    const hardKey = `${subject.id}-HARD`;
    const expertKey = `${subject.id}-EXPERT`;

    const easyPassed =
      scoresBySubjectDifficulty.get(easyKey)?.passed || false;
    const mediumPassed =
      scoresBySubjectDifficulty.get(mediumKey)?.passed || false;
    const hardPassed =
      scoresBySubjectDifficulty.get(hardKey)?.passed || false;
    const expertPassed =
      scoresBySubjectDifficulty.get(expertKey)?.passed || false;

    // Calculate progress as tiers completed
    const tiersCompleted = [easyPassed, mediumPassed, hardPassed, expertPassed]
      .filter(Boolean).length;
    const totalTiers = 4;
    const progressPercentage = (tiersCompleted / totalTiers) * 100;

    // Determine current tier (highest unlocked tier)
    let currentTier: ExamDifficulty = "EASY";
    if (expertPassed) currentTier = "EXPERT";
    else if (hardPassed) currentTier = "HARD";
    else if (mediumPassed) currentTier = "MEDIUM";

    // Determine next unlock
    let nextUnlock: ExamDifficulty | null = null;
    if (!mediumPassed && easyPassed) nextUnlock = "MEDIUM";
    else if (!hardPassed && mediumPassed) nextUnlock = "HARD";
    else if (!expertPassed && hardPassed) nextUnlock = "EXPERT";

    // Count available exams in current tier
    // Only count exams that:
    // - Are in the current difficulty tier
    // - Have NOT been completed (status is not COMPLETED/ARCHIVED/CANCELLED/DRAFT)
    // - Have started (startsAt is null or in the past)
    // - If endsAt exists, the exam hasn't ended yet
    const now = new Date();
    const examsAvailable = subject.exams.filter((exam: any) => {
      // Only count current difficulty tier exams
      if (exam.difficulty !== currentTier) return false;
      
      // Skip archived/draft/cancelled/completed exams
      if (["ARCHIVED", "CANCELLED", "DRAFT", "COMPLETED"].includes(exam.status)) return false;
      
      // Check if exam has started (startsAt is null or in the past)
      const startsAt = exam.startsAt ? new Date(exam.startsAt) : null;
      if (startsAt && startsAt > now) return false;
      
      // Check if exam has ended (endsAt exists and is in the past)
      const endsAt = exam.endsAt ? new Date(exam.endsAt) : null;
      if (endsAt && endsAt <= now) return false;
      
      return true;
    }).length;

    // Determine status
    // - COMPLETED: All 4 tiers passed
    // - STAND_BY: Has started (passed EASY) but no exams available in current tier
    // - IN_PROGRESS: Has passed some tiers but has exams available
    // - LOCKED: Hasn't passed EASY yet (tied to subject enrollment)
    let status: "IN_PROGRESS" | "COMPLETED" | "LOCKED" | "STAND_BY" = "IN_PROGRESS";
    
    if (
      easyPassed &&
      mediumPassed &&
      hardPassed &&
      expertPassed
    ) {
      status = "COMPLETED";
    } else if (
      (easyPassed ||
        mediumPassed ||
        hardPassed ||
        expertPassed) &&
      examsAvailable === 0
    ) {
      // Student has passed at least one tier but there are no exams available
      status = "STAND_BY";
    }

    return {
      id: subject.id,
      slug: subject.slug,
      name: subject.name,
      code: subject.code,
      progress: Math.round(progressPercentage),
      currentTier,
      nextUnlock,
      examsAvailable,
      status,
      easyPassed,
      mediumPassed,
      hardPassed,
      expertPassed,
    };
  });

  // Calculate dashboard stats
  const totalSubjects = subjectCards.length;
  const completedSubjects = subjectCards.filter(
    (s) => s.status === "COMPLETED"
  ).length;
  const activeSubjects = subjectCards.filter(
    (s) =>
      (s.status === "IN_PROGRESS" || s.status === "STAND_BY") &&
      (s.easyPassed ||
        scoresBySubjectDifficulty.has(`${s.id}-EASY`))
  ).length;

  const overallProgress =
    totalSubjects > 0
      ? Math.round((completedSubjects / totalSubjects) * 100)
      : 0;

  const stats: DashboardStats = {
    totalSubjects,
    activeSubjects,
    completedSubjects,
    overallProgress,
  };

  return {
    stats,
    subjects: subjectCards,
  };
};

/**
 * Get high scores for a student in a specific subject and difficulty
 */
export const getHighestScore = async (
  studentId: number,
  subjectId: number,
  difficulty: ExamDifficulty
): Promise<number | null> => {
  const attempt = await prisma.examAttempt.findFirst({
    where: {
      studentId,
      exam: {
        subjectId,
        difficulty,
        isArchived: false,
      },
    },
    orderBy: { score: "desc" },
    select: { score: true },
  });

  return attempt?.score ?? null;
};

/**
 * Check if a student has passed a difficulty tier
 */
export const hasPassed = async (
  studentId: number,
  subjectId: number,
  difficulty: ExamDifficulty
): Promise<boolean> => {
  // Get the passing threshold for this difficulty
  const threshold = await prisma.difficultyThreshold.findUnique({
    where: {
      subjectId_difficulty: { subjectId, difficulty },
    },
    select: { passingScore: true },
  });

  const passingScore = threshold?.passingScore || 75;

  // Get highest score in this difficulty
  const highestScore = await getHighestScore(
    studentId,
    subjectId,
    difficulty
  );

  return highestScore !== null && highestScore >= passingScore;
};;
