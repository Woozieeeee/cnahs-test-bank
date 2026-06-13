/**
 * Frontend Grading Service
 * Provides formulas and calculations for student progress grading
 */

export interface GradingMetrics {
  examId: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unansweredQuestions: number;
  score: number;
  passed: boolean;
  passingScore: number;
  correctPercentage: number;
  wrongPercentage: number;
  unansweredPercentage: number;
}

export interface TierGradingStats {
  tier: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  totalExamsAvailable: number;
  totalExamsAttempted: number;
  completedExams: number;
  unansweredExams: number;
  pendingExams: number;
  averageScore: number;
  highestScore: number | null;
  lowestScore: number | null;
  passingScore: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  totalUnansweredQuestions: number;
  completionRate: number;
  successRate: number;
  overallAccuracy: number;
  grade: string;
}

/**
 * Get letter grade based on percentage score
 * A+: 98-100, A: 93-97, B: 85-92, C: 75-84, D: 60-74, F: 0-59
 */
export const getLetterGrade = (percentage: number): string => {
  if (percentage >= 98) return "A+";
  if (percentage >= 93) return "A";
  if (percentage >= 85) return "B";
  if (percentage >= 75) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

/**
 * Get color for grade
 */
export const getGradeColor = (grade: string): string => {
  const colors: Record<string, string> = {
    "A+": "text-emerald-600",
    "A": "text-emerald-600",
    "B": "text-blue-600",
    "C": "text-amber-600",
    "D": "text-orange-600",
    "F": "text-red-600",
  };
  return colors[grade] || "text-muted-foreground";
};

/**
 * Get background color for grade badge
 */
export const getGradeBadgeColor = (grade: string): string => {
  const colors: Record<string, string> = {
    "A+": "bg-emerald-100 text-emerald-700 border-emerald-300",
    "A": "bg-emerald-100 text-emerald-700 border-emerald-300",
    "B": "bg-blue-100 text-blue-700 border-blue-300",
    "C": "bg-amber-100 text-amber-700 border-amber-300",
    "D": "bg-orange-100 text-orange-700 border-orange-300",
    "F": "bg-red-100 text-red-700 border-red-300",
  };
  return colors[grade] || "bg-muted text-muted-foreground";
};

/**
 * Calculate exam grading metrics
 * 
 * Formula:
 * - Correct Answers: Count of isCorrect = true
 * - Wrong Answers: Count of isCorrect = false
 * - Unanswered: totalQuestions - (correctAnswers + wrongAnswers)
 * - Score: already calculated by backend (correctAnswers / totalQuestions * 100)
 * - Passed: score >= passingScore
 * - Percentages: (metric / totalQuestions) * 100
 */
export const calculateExamGrading = (
  totalQuestions: number,
  correctAnswers: number,
  wrongAnswers: number,
  unansweredQuestions: number,
  score: number,
  passingScore: number
): GradingMetrics => {
  return {
    examId: 0, // Will be set by caller
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unansweredQuestions,
    score: Math.round(score),
    passed: score >= passingScore,
    passingScore,
    correctPercentage: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
    wrongPercentage: totalQuestions > 0 ? Math.round((wrongAnswers / totalQuestions) * 100) : 0,
    unansweredPercentage: totalQuestions > 0 ? Math.round((unansweredQuestions / totalQuestions) * 100) : 0,
  };
};

/**
 * Performance level indicator based on metrics
 */
export const getPerformanceLevel = (accuracy: number): string => {
  if (accuracy >= 95) return "Excellent";
  if (accuracy >= 85) return "Very Good";
  if (accuracy >= 75) return "Good";
  if (accuracy >= 65) return "Fair";
  if (accuracy >= 50) return "Needs Improvement";
  return "Poor";
};

/**
 * Calculate study recommendation based on performance
 */
export const getStudyRecommendation = (stats: TierGradingStats): string[] => {
  const recommendations: string[] = [];

  // Low accuracy
  if (stats.overallAccuracy < 60) {
    recommendations.push("Focus on reviewing the core concepts for this tier");
  }

  // High unanswered rate
  if (stats.totalUnansweredQuestions > stats.totalCorrectAnswers) {
    recommendations.push("Practice time management - too many unanswered questions");
  }

  // Low completion rate
  if (stats.completionRate < 50) {
    recommendations.push("Attempt more exams to build confidence");
  }

  // Good performance
  if (stats.averageScore >= 85 && stats.completionRate > 80) {
    recommendations.push("Excellent work! Ready for the next difficulty tier");
  }

  if (recommendations.length === 0) {
    recommendations.push("Keep practicing to improve your score");
  }

  return recommendations;
};

/**
 * Calculate progress towards next tier
 */
export const calculateTierProgress = (
  currentTierStats: TierGradingStats,
  nextTierStats?: TierGradingStats
): { progress: number; message: string } => {
  const requiredAccuracy = currentTierStats.passingScore;
  const progress = Math.min(
    100,
    Math.round((currentTierStats.overallAccuracy / requiredAccuracy) * 100)
  );

  let message = "";
  if (currentTierStats.averageScore >= requiredAccuracy) {
    message = "✅ Tier passed! Ready for next challenge";
  } else {
    const needed = requiredAccuracy - currentTierStats.overallAccuracy;
    message = `${needed}% more accuracy needed to pass`;
  }

  return { progress, message };
};
