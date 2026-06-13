/**
 * Advanced Grading Service
 *
 * Implements comprehensive student progress grading and averaging formulas
 * across 8 phases: Question-level, Exam, Tier, Subject, Comparison, Timeline, Predictive, and System metrics
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ==================== TYPES ====================

interface QuestionMetrics {
  isCorrect: boolean;
  points: number;
  weight: number;
  timeSpent: number;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
}

interface ExamScoreResult {
  rawScore: number;
  weightedScore: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  submissionRate: number;
  passed: boolean;
  efficiency: number;
  answerDistribution: {
    correctPct: number;
    wrongPct: number;
    unansweredPct: number;
  };
}

interface TierMetrics {
  totalAttempts: number;
  passedAttempts: number;
  failedAttempts: number;
  highestScore: number;
  lowestScore: number;
  averageScore: number;
  medianScore: number;
  standardDeviation: number;
  passRate: number;
  improvementTrend: number;
  consistencyScore: number;
  masteryScore: number;
  efficiencyScore: number;
}

interface SubjectMetrics {
  subjectAverage: number;
  weightedByTier: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
  cumulativeMastery: number;
  passRate: number;
  grade: string;
  gpa: number;
  targetReadiness: number;
  learningVelocity: number;
  highestScorePerTier: Record<string, number>;
}

interface StudentPerformanceReport {
  studentId: string;
  subjects: Record<string, SubjectMetrics>;
  overallGPA: number;
  overallAverage: number;
  engagementScore: number;
  totalExamsAttempted: number;
  examsPerWeek: number;
  topSubject: string;
  weakestSubject: string;
  overallTrend: string;
  recommendations: string[];
}

// ==================== CONSTANTS ====================

const DIFFICULTY_WEIGHTS = {
  EASY: 1.0,
  MEDIUM: 1.5,
  HARD: 2.0,
  EXPERT: 2.5,
};

const STANDARD_TIMES_SECONDS = {
  EASY: 60,
  MEDIUM: 90,
  HARD: 120,
  EXPERT: 150,
};

const PASSING_SCORES = {
  EASY: 70,
  MEDIUM: 75,
  HARD: 80,
  EXPERT: 85,
};

const GRADE_SCALE = {
  "A+": { min: 96, max: 100, gpa: 4.0 },
  A: { min: 90, max: 95, gpa: 3.9 },
  "B+": { min: 86, max: 89, gpa: 3.7 },
  B: { min: 80, max: 85, gpa: 3.3 },
  "C+": { min: 76, max: 79, gpa: 3.0 },
  C: { min: 70, max: 75, gpa: 2.7 },
  "D+": { min: 66, max: 69, gpa: 1.3 },
  D: { min: 60, max: 65, gpa: 1.0 },
  F: { min: 0, max: 59, gpa: 0.0 },
};

// ==================== PHASE 1: Question-Level Metrics ====================

export class QuestionLevelMetrics {
  /**
   * Phase 1.2: Calculate question accuracy across multiple questions
   */
  static calculateQuestionAccuracy(
    correctAnswers: number,
    totalQuestions: number,
  ): number {
    if (totalQuestions === 0) return 0;
    return (correctAnswers / totalQuestions) * 100;
  }

  /**
   * Phase 1.3: Calculate efficiency ratio for a question
   */
  static calculateEfficiencyRatio(
    difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT",
    actualTimeSpent: number,
  ): number {
    const standardTime = STANDARD_TIMES_SECONDS[difficulty];
    if (actualTimeSpent === 0) return 0;
    return (standardTime / actualTimeSpent) * 100;
  }

  /**
   * Calculate average time per question
   */
  static calculateAverageTimePerQuestion(
    totalTimeSpent: number,
    totalQuestions: number,
  ): number {
    if (totalQuestions === 0) return 0;
    return totalTimeSpent / totalQuestions;
  }
}

// ==================== PHASE 2: Single Exam Metrics ====================

export class ExamMetrics {
  /**
   * Phase 2.1: Calculate raw exam score
   */
  static calculateRawScore(
    correctAnswers: number,
    totalQuestions: number,
  ): number {
    if (totalQuestions === 0) return 0;
    return (correctAnswers / totalQuestions) * 100;
  }

  /**
   * Phase 2.2: Calculate weighted exam score based on difficulty
   */
  static calculateWeightedScore(
    questionResults: Array<{
      isCorrect: boolean;
      difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
    }>,
  ): number {
    let correctWeightedPoints = 0;
    let totalWeightedPoints = 0;

    for (const result of questionResults) {
      const weight = DIFFICULTY_WEIGHTS[result.difficulty];
      totalWeightedPoints += weight;
      if (result.isCorrect) {
        correctWeightedPoints += weight;
      }
    }

    if (totalWeightedPoints === 0) return 0;
    return (correctWeightedPoints / totalWeightedPoints) * 100;
  }

  /**
   * Phase 2.3: Calculate answer status breakdown
   */
  static calculateAnswerDistribution(
    submitted: number,
    unanswered: number,
    flagged: number,
  ): {
    correct: number;
    wrong: number;
    unanswered: number;
    submissionRate: number;
  } {
    const total = submitted + unanswered + flagged;
    if (total === 0)
      return { correct: 0, wrong: 0, unanswered: 0, submissionRate: 0 };

    return {
      correct: submitted,
      wrong: 0, // Will be calculated separately
      unanswered: unanswered,
      submissionRate: (submitted / total) * 100,
    };
  }

  /**
   * Phase 2.4: Calculate percentage breakdown of answers
   */
  static calculatePercentageBreakdown(
    correct: number,
    wrong: number,
    unanswered: number,
  ): {
    correctPct: number;
    wrongPct: number;
    unansweredPct: number;
  } {
    const total = correct + wrong + unanswered;
    if (total === 0) {
      return { correctPct: 0, wrongPct: 0, unansweredPct: 0 };
    }

    return {
      correctPct: (correct / total) * 100,
      wrongPct: (wrong / total) * 100,
      unansweredPct: (unanswered / total) * 100,
    };
  }

  /**
   * Phase 2.5: Determine if exam passed
   */
  static isPassed(
    score: number,
    difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT",
  ): boolean {
    return score >= PASSING_SCORES[difficulty];
  }

  /**
   * Phase 2.6: Calculate efficiency score for single exam
   */
  static calculateExamEfficiency(
    submittedCount: number,
    totalQuestions: number,
    actualTotalTime: number,
    standardTotalTime: number,
  ): number {
    const completionRate = (submittedCount / totalQuestions) * 100;
    const timeEfficiency = (standardTotalTime / actualTotalTime) * 100;

    let efficiency = (completionRate * timeEfficiency) / 2;
    return Math.min(efficiency, 100); // Cap at 100%
  }

  /**
   * Phase 2 Complete: Get all exam metrics
   */
  static getCompleteExamMetrics(
    questionResults: Array<{
      isCorrect: boolean;
      difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
    }>,
    totalTime: number,
    difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT",
  ): ExamScoreResult {
    const correctCount = questionResults.filter((q) => q.isCorrect).length;
    const totalQuestions = questionResults.length;
    const wrongCount = totalQuestions - correctCount;

    const rawScore = this.calculateRawScore(correctCount, totalQuestions);
    const weightedScore = this.calculateWeightedScore(questionResults);
    const passed = this.isPassed(rawScore, difficulty);

    const standardTime = questionResults.reduce(
      (sum, q) => sum + STANDARD_TIMES_SECONDS[q.difficulty],
      0,
    );

    const efficiency = this.calculateExamEfficiency(
      correctCount,
      totalQuestions,
      totalTime,
      standardTime,
    );

    const answerDistribution = this.calculatePercentageBreakdown(
      correctCount,
      wrongCount,
      0,
    );

    return {
      rawScore,
      weightedScore,
      correctCount,
      wrongCount,
      unansweredCount: 0,
      submissionRate: 100,
      passed,
      efficiency,
      answerDistribution,
    };
  }
}

// ==================== PHASE 3: Difficulty Tier Metrics ====================

export class TierMetricsCalculator {
  /**
   * Phase 3.1: Calculate comprehensive tier statistics
   */
  static calculateTierStats(scores: number[]): TierMetrics {
    if (scores.length === 0) {
      return {
        totalAttempts: 0,
        passedAttempts: 0,
        failedAttempts: 0,
        highestScore: 0,
        lowestScore: 0,
        averageScore: 0,
        medianScore: 0,
        standardDeviation: 0,
        passRate: 0,
        improvementTrend: 0,
        consistencyScore: 0,
        masteryScore: 0,
        efficiencyScore: 0,
      };
    }

    const sorted = [...scores].sort((a, b) => a - b);
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;

    // Median
    const median =
      scores.length % 2 === 0
        ? (sorted[scores.length / 2 - 1] + sorted[scores.length / 2]) / 2
        : sorted[Math.floor(scores.length / 2)];

    // Standard Deviation
    const squaredDiffs = scores.map((score) => Math.pow(score - average, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / scores.length;
    const standardDeviation = Math.sqrt(variance);

    // Pass rate (assuming 75% threshold for MEDIUM)
    const passedAttempts = scores.filter((s) => s >= 75).length;
    const passRate = (passedAttempts / scores.length) * 100;

    // Improvement trend
    const firstThreeAvg =
      scores.length >= 3
        ? scores.slice(0, 3).reduce((a, b) => a + b) / 3
        : average;
    const lastThreeAvg =
      scores.length >= 3
        ? scores.slice(-3).reduce((a, b) => a + b) / 3
        : average;
    const improvementTrend = lastThreeAvg - firstThreeAvg;

    // Consistency score
    const consistencyScore = Math.max(0, 100 - standardDeviation);

    // Mastery score
    const masteryScore =
      passRate * 0.4 + average * 0.4 + consistencyScore * 0.2;

    return {
      totalAttempts: scores.length,
      passedAttempts,
      failedAttempts: scores.length - passedAttempts,
      highestScore: highest,
      lowestScore: lowest,
      averageScore: average,
      medianScore: median,
      standardDeviation,
      passRate,
      improvementTrend,
      consistencyScore,
      masteryScore,
      efficiencyScore: 0, // Will be calculated separately
    };
  }

  /**
   * Phase 3.2: Calculate tier pass rate
   */
  static calculatePassRate(
    passedAttempts: number,
    totalAttempts: number,
  ): number {
    if (totalAttempts === 0) return 0;
    return (passedAttempts / totalAttempts) * 100;
  }

  /**
   * Phase 3.3: Calculate improvement trend
   */
  static calculateImprovementTrend(scores: number[]): number {
    if (scores.length < 3) return 0;

    const firstThreeAvg =
      scores.slice(0, 3).reduce((a, b) => a + b, 0) /
      Math.min(3, scores.length);
    const lastThreeAvg =
      scores.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, scores.length);

    return lastThreeAvg - firstThreeAvg;
  }

  /**
   * Phase 3.4: Calculate consistency score
   */
  static calculateConsistencyScore(standardDeviation: number): number {
    return Math.max(0, 100 - standardDeviation);
  }

  /**
   * Phase 3.6: Calculate tier mastery score
   */
  static calculateMasteryScore(
    passRate: number,
    averageScore: number,
    consistencyScore: number,
  ): number {
    return passRate * 0.4 + averageScore * 0.4 + consistencyScore * 0.2;
  }
}

// ==================== PHASE 4: Subject-Level Metrics ====================

export class SubjectMetricsCalculator {
  /**
   * Phase 4.1: Calculate subject overall average
   */
  static calculateSubjectAverage(
    easyAvg: number,
    mediumAvg: number,
    hardAvg: number,
    expertAvg: number,
    weights: { easy: number; medium: number; hard: number; expert: number } = {
      easy: 0.15,
      medium: 0.25,
      hard: 0.35,
      expert: 0.25,
    },
  ): number {
    return (
      easyAvg * weights.easy +
      mediumAvg * weights.medium +
      hardAvg * weights.hard +
      expertAvg * weights.expert
    );
  }

  /**
   * Phase 4.2: Calculate subject pass rate across all tiers
   */
  static calculateSubjectPassRate(
    easyPassed: number,
    easyTotal: number,
    mediumPassed: number,
    mediumTotal: number,
    hardPassed: number,
    hardTotal: number,
    expertPassed: number,
    expertTotal: number,
  ): number {
    const totalPassed = easyPassed + mediumPassed + hardPassed + expertPassed;
    const totalAttempts = easyTotal + mediumTotal + hardTotal + expertTotal;

    if (totalAttempts === 0) return 0;
    return (totalPassed / totalAttempts) * 100;
  }

  /**
   * Phase 4.4: Calculate cumulative mastery
   */
  static calculateCumulativeMastery(
    easyMastery: number,
    mediumMastery: number,
    hardMastery: number,
    expertMastery: number,
  ): number {
    const weights = { easy: 1.0, medium: 1.3, hard: 1.6, expert: 2.0 };
    const totalWeight =
      weights.easy + weights.medium + weights.hard + weights.expert;

    return (
      (easyMastery * weights.easy +
        mediumMastery * weights.medium +
        hardMastery * weights.hard +
        expertMastery * weights.expert) /
      totalWeight
    );
  }

  /**
   * Phase 4.6: Calculate learning velocity (per day)
   */
  static calculateLearningVelocity(
    currentMonthAverage: number,
    previousMonthAverage: number,
    days: number = 30,
  ): number {
    return (currentMonthAverage - previousMonthAverage) / days;
  }

  /**
   * Phase 4.7: Calculate target readiness
   */
  static calculateTargetReadiness(
    passRate: number,
    cumulativeMastery: number,
  ): number {
    return passRate * 0.5 + (cumulativeMastery / 100) * 50;
  }

  /**
   * Map score to grade
   */
  static scoreToGrade(score: number): string {
    for (const [grade, range] of Object.entries(GRADE_SCALE)) {
      if (score >= range.min && score <= range.max) {
        return grade;
      }
    }
    return "F";
  }

  /**
   * Get GPA for grade
   */
  static getGPA(grade: string): number {
    return GRADE_SCALE[grade as keyof typeof GRADE_SCALE]?.gpa || 0;
  }
}

// ==================== PHASE 5: Comparison and Benchmarking ====================

export class ComparisonMetrics {
  /**
   * Phase 5.1: Compare current to personal best
   */
  static calculatePersonalBestComparison(
    currentScore: number,
    personalBest: number,
  ): number {
    if (personalBest === 0) return 0;
    return ((currentScore - personalBest) / personalBest) * 100;
  }

  /**
   * Phase 5.3: Calculate percentile rank
   */
  static calculatePercentileRank(
    studentScore: number,
    allScores: number[],
  ): number {
    const belowScore = allScores.filter((s) => s < studentScore).length;
    return (belowScore / allScores.length) * 100;
  }

  /**
   * Phase 5.4: Calculate performance gap vs class average
   */
  static calculatePerformanceGap(
    studentAverage: number,
    classAverage: number,
  ): number {
    return studentAverage - classAverage;
  }
}

// ==================== PHASE 6: Progress Timeline and Trends ====================

export class TimelineMetrics {
  /**
   * Phase 6.1: Calculate weekly average
   */
  static calculateWeeklyAverage(scoresInWeek: number[]): number {
    if (scoresInWeek.length === 0) return 0;
    return scoresInWeek.reduce((a, b) => a + b, 0) / scoresInWeek.length;
  }

  /**
   * Phase 6.3: Calculate attempts to mastery
   */
  static calculateAttemptsToMastery(
    scores: number[],
    masteryThreshold: number = 80,
  ): number {
    const index = scores.findIndex((s) => s >= masteryThreshold);
    return index !== -1 ? index + 1 : -1;
  }

  /**
   * Phase 6.4: Calculate retention rate over time
   */
  static calculateRetentionRate(
    averageNow: number,
    averageNDaysAgo: number,
  ): number {
    if (averageNDaysAgo === 0) return 0;
    return (averageNow / averageNDaysAgo) * 100;
  }
}

// ==================== PHASE 7: Predictive Metrics ====================

export class PredictiveMetrics {
  /**
   * Phase 7.1: Calculate next tier readiness
   */
  static calculateNextTierReadiness(passRate: number, average: number): number {
    return passRate * 0.6 + average * 0.4;
  }

  /**
   * Phase 7.2: Estimate completion time
   */
  static estimateCompletionTime(
    requiredPasses: number,
    currentPasses: number,
    averageTimePerExamMinutes: number,
    examsPerWeek: number,
  ): number {
    const passesNeeded = requiredPasses - currentPasses;
    const totalMinutesNeeded = passesNeeded * averageTimePerExamMinutes;
    return totalMinutesNeeded / (examsPerWeek * 60); // Returns days
  }

  /**
   * Phase 7.3: Identify weak areas
   */
  static identifyWeakAreas(
    topicScores: Record<string, number>,
    averageScore: number,
    standardDeviation: number,
  ): string[] {
    const threshold = averageScore - 0.5 * standardDeviation;
    return Object.entries(topicScores)
      .filter(([_, score]) => score < threshold)
      .map(([topic, _]) => topic);
  }

  /**
   * Phase 7.4: Identify strong areas
   */
  static identifyStrongAreas(
    topicScores: Record<string, number>,
    averageScore: number,
    standardDeviation: number,
  ): string[] {
    const threshold = averageScore + 0.5 * standardDeviation;
    return Object.entries(topicScores)
      .filter(([_, score]) => score >= threshold)
      .map(([topic, _]) => topic);
  }
}

// ==================== PHASE 8: Aggregate Metrics ====================

export class AggregateMetrics {
  /**
   * Phase 8.1: Calculate overall GPA
   */
  static calculateOverallGPA(
    subjectGPAs: Record<string, { gpa: number; credits: number }>,
  ): number {
    let totalWeightedGPA = 0;
    let totalCredits = 0;

    for (const [_, data] of Object.entries(subjectGPAs)) {
      totalWeightedGPA += data.gpa * data.credits;
      totalCredits += data.credits;
    }

    if (totalCredits === 0) return 0;
    return totalWeightedGPA / totalCredits;
  }

  /**
   * Phase 8.2: Calculate multi-subject average
   */
  static calculateMultiSubjectAverage(
    subjectAverages: Record<string, number>,
    weights?: Record<string, number>,
  ): number {
    const subjects = Object.entries(subjectAverages);

    if (subjects.length === 0) return 0;

    if (!weights) {
      // Equal weights
      return subjects.reduce((sum, [_, avg]) => sum + avg, 0) / subjects.length;
    }

    let totalWeighted = 0;
    let totalWeight = 0;

    for (const [subject, average] of subjects) {
      const weight = weights[subject] || 1;
      totalWeighted += average * weight;
      totalWeight += weight;
    }

    return totalWeight === 0 ? 0 : totalWeighted / totalWeight;
  }

  /**
   * Phase 8.3: Calculate participation metrics
   */
  static calculateParticipationMetrics(
    totalExams: number,
    weeksSinceStart: number,
    activeDays: number,
    totalDays: number,
  ): {
    examsPerWeek: number;
    activityConsistency: number;
  } {
    const examsPerWeek = weeksSinceStart > 0 ? totalExams / weeksSinceStart : 0;
    const activityConsistency =
      totalDays > 0 ? (activeDays / totalDays) * 100 : 0;

    return { examsPerWeek, activityConsistency };
  }

  /**
   * Phase 8.4: Calculate engagement score
   */
  static calculateEngagementScore(
    examsPerWeek: number,
    activityConsistency: number,
    averageTimePerExamSeconds: number,
  ): number {
    const examComponent = Math.min((examsPerWeek / 5) * 30, 30); // Max 30%
    const consistencyComponent = (activityConsistency / 100) * 30; // Max 30%
    const timeComponent = Math.min((averageTimePerExamSeconds / 1800) * 40, 40); // Max 40%

    return Math.min(examComponent + consistencyComponent + timeComponent, 100);
  }
}

// ==================== MAIN SERVICE ====================

export class AdvancedGradingService {
  /**
   * Generate complete student performance report
   */
  static async generateStudentReport(
    studentId: string,
    subjectIds: string[],
  ): Promise<StudentPerformanceReport> {
    // This would fetch data from database and calculate all metrics
    // Implementation depends on database structure

    const report: StudentPerformanceReport = {
      studentId,
      subjects: {},
      overallGPA: 0,
      overallAverage: 0,
      engagementScore: 0,
      totalExamsAttempted: 0,
      examsPerWeek: 0,
      topSubject: "",
      weakestSubject: "",
      overallTrend: "",
      recommendations: [],
    };

    return report;
  }

  /**
   * Get mastery level from score
   */
  static getMasteryLevel(score: number): string {
    if (score >= 90) return "Mastered";
    if (score >= 80) return "Highly Proficient";
    if (score >= 70) return "Proficient";
    if (score >= 60) return "Developing";
    return "Novice";
  }

  /**
   * Get recommendation based on performance
   */
  static getRecommendation(
    score: number,
    passRate: number,
    trend: number,
  ): string {
    if (score >= 85 && passRate >= 80) {
      return "Excellent progress! Continue with advanced material.";
    }
    if (score >= 70 && passRate >= 60) {
      return "Good foundation. Focus on weak areas to improve further.";
    }
    if (trend > 0) {
      return "Improving! Keep up with consistent practice.";
    }
    return "Needs improvement. Consider reviewing fundamentals.";
  }
}

export default AdvancedGradingService;
