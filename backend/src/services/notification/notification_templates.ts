/**
 * Notification Templates for Each Role
 * PHASE 1: Students
 * PHASE 2: Faculty
 * PHASE 3: Admin
 */

// ==========================================
// PHASE 1: STUDENT NOTIFICATION TEMPLATES
// ==========================================

export const StudentNotificationTemplates = {
  EXAM_SCHEDULED: {
    title: "New Exam Scheduled",
    messageTemplate: (data: any) =>
      `${data.examTitle} has been scheduled for ${data.examDate}. Duration: ${data.duration} minutes.`,
  },

  EXAM_STARTING_SOON: {
    title: "Exam Starting Soon",
    messageTemplate: (data: any) =>
      `${data.examTitle} starts in ${data.minutesUntilStart} minutes. Please prepare your device and ensure a stable internet connection.`,
  },

  EXAM_COMPLETED: {
    title: "Exam Submitted Successfully",
    messageTemplate: (data: any) =>
      `Your exam "${data.examTitle}" has been submitted. Your score will be available shortly.`,
  },

  EXAM_RESULT_PUBLISHED: {
    title: "Exam Results Available",
    messageTemplate: (data: any) => {
      const status = data.passed ? "✓ PASSED" : "✗ NOT PASSED";
      return `Results for "${data.examTitle}": ${status}. Your score: ${data.score}/${data.totalScore} (${data.percentage}%)`;
    },
  },

  EXAM_ATTEMPT_FLAGGED: {
    title: "Exam Attempt Under Review",
    messageTemplate: (data: any) =>
      `Your exam attempt for "${data.examTitle}" has been flagged for review due to: ${data.reason}. This will not affect your ability to retake the exam.`,
  },

  PROGRESS_MILESTONE: {
    title: "Progress Milestone Unlocked",
    messageTemplate: (data: any) =>
      `Congratulations! You've unlocked ${data.difficulty} difficulty for ${data.subject}. Keep up the great work!`,
  },

  DEADLINE_REMINDER: {
    title: "Exam Deadline Approaching",
    messageTemplate: (data: any) =>
      `Don't forget! ${data.examTitle} closes in ${data.hoursRemaining} hours. Make sure to complete it before the deadline.`,
  },

  NEW_SUBJECT_ENROLLED: {
    title: "New Subject Enrollment",
    messageTemplate: (data: any) =>
      `You have been enrolled in ${data.subjectName}. Start taking quizzes to build your knowledge!`,
  },

  LOW_PERFORMANCE_ALERT: {
    title: "Performance Alert",
    messageTemplate: (data: any) =>
      `Your performance in ${data.subject} has been below 75%. We recommend reviewing the materials and attempting practice questions.`,
  },

  DIFFICULTY_LEVEL_UNLOCK: {
    title: "New Difficulty Level Available",
    messageTemplate: (data: any) =>
      `You've mastered ${data.currentDifficulty} level in ${data.subject}! The ${data.nextDifficulty} level is now available.`,
  },
};

// ==========================================
// PHASE 2: FACULTY NOTIFICATION TEMPLATES
// ==========================================

export const FacultyNotificationTemplates = {
  EXAM_CREATED: {
    title: "Exam Created",
    messageTemplate: (data: any) =>
      `You have created "${data.examTitle}" for ${data.sectionName}. Current status: Draft. Configure and publish when ready.`,
  },

  EXAM_PUBLISHED: {
    title: "Exam Published",
    messageTemplate: (data: any) =>
      `Exam "${data.examTitle}" has been published and is now available to ${data.studentCount} students in ${data.sectionName}.`,
  },

  EXAM_STARTED: {
    title: "Exam Session Started",
    messageTemplate: (data: any) =>
      `"${data.examTitle}" exam session has started. ${data.activeStudents} students are currently taking the exam.`,
  },

  EXAM_COMPLETED_FACULTY: {
    title: "Exam Session Completed",
    messageTemplate: (data: any) =>
      `"${data.examTitle}" exam has ended. ${data.submittedCount}/${data.totalStudents} students submitted. Average score: ${data.averageScore}%`,
  },

  STUDENT_SUBMISSION_RECEIVED: {
    title: "Student Submission Received",
    messageTemplate: (data: any) =>
      `${data.studentName} submitted "${data.examTitle}". Score: ${data.score}/${data.totalScore}. Status: ${data.status}`,
  },

  VIOLATION_DETECTED: {
    title: "Exam Violation Detected",
    messageTemplate: (data: any) =>
      `Violation in "${data.examTitle}" - Student: ${data.studentName}. Type: ${data.violationType}. Severity: ${data.severity}. Review required.`,
  },

  QUESTION_BATCH_IMPORTED: {
    title: "Question Batch Imported",
    messageTemplate: (data: any) =>
      `${data.importedCount} questions imported successfully for ${data.topicName}. ${data.skippedCount} questions were skipped.`,
  },

  EXAM_PERFORMANCE_SUMMARY: {
    title: "Exam Performance Summary",
    messageTemplate: (data: any) =>
      `Performance report for "${data.examTitle}": Average: ${data.averageScore}%, Pass Rate: ${data.passRate}%, Highest: ${data.highestScore}%, Lowest: ${data.lowestScore}%`,
  },

  NEW_QUESTION_IMPORT_REQUEST: {
    title: "Question Import Pending",
    messageTemplate: (data: any) =>
      `Question import for ${data.topicName} is pending review. ${data.questionCount} questions queued for import.`,
  },

  STUDENT_PERFORMANCE_ALERT: {
    title: "Student Performance Alert",
    messageTemplate: (data: any) =>
      `${data.studentName} has scored below 60% on "${data.examTitle}". Consider reaching out to provide additional support.`,
  },
};

// ==========================================
// PHASE 3: ADMIN NOTIFICATION TEMPLATES
// ==========================================

export const AdminNotificationTemplates = {
  SYSTEM_ALERT: {
    title: "System Alert",
    messageTemplate: (data: any) =>
      `System alert: ${data.message}. Please check the admin dashboard for more details.`,
  },

  USER_ACCOUNT_CREATED: {
    title: "New User Account Created",
    messageTemplate: (data: any) =>
      `New ${data.role} account created: ${data.userName} (${data.userEmail}). Status: ${data.accountStatus}`,
  },

  USER_ACCOUNT_STATUS_CHANGED: {
    title: "User Account Status Updated",
    messageTemplate: (data: any) =>
      `${data.userName}'s account status changed from ${data.oldStatus} to ${data.newStatus}. Action: ${data.action}`,
  },

  EXAM_VIOLATION_ESCALATION: {
    title: "Exam Violation Escalation",
    messageTemplate: (data: any) =>
      `High-severity violation escalation: Student ${data.studentName} in exam "${data.examTitle}". Violations: ${data.violationCount}. Recommended action: ${data.recommendedAction}`,
  },

  BULK_IMPORT_COMPLETED: {
    title: "Bulk Import Completed",
    messageTemplate: (data: any) =>
      `Bulk import job completed. Total: ${data.totalRecords}, Success: ${data.successCount}, Failed: ${data.failureCount}. Errors: ${data.errorCount}`,
  },

  SYSTEM_ERROR_LOGGED: {
    title: "System Error Detected",
    messageTemplate: (data: any) =>
      `System error logged: ${data.errorType}. Module: ${data.module}. Frequency: ${data.occurrenceCount} times. Review logs immediately.`,
  },

  SUSPICIOUS_ACTIVITY_DETECTED: {
    title: "Suspicious Activity Alert",
    messageTemplate: (data: any) =>
      `Suspicious activity detected: ${data.activityType}. User: ${data.userName}. Time: ${data.activityTime}. IP: ${data.ipAddress}`,
  },

  DATABASE_BACKUP_COMPLETED: {
    title: "Database Backup Completed",
    messageTemplate: (data: any) =>
      `Database backup completed successfully. Size: ${data.backupSize}GB. Duration: ${data.duration}s. Backup ID: ${data.backupId}`,
  },

  SECURITY_ALERT: {
    title: "Security Alert",
    messageTemplate: (data: any) =>
      `Security alert: ${data.alertType}. Severity: ${data.severity}. Affected users: ${data.affectedCount}. Action required: ${data.actionRequired}`,
  },

  USER_APPROVAL_REQUIRED: {
    title: "User Account Approval Required",
    messageTemplate: (data: any) =>
      `${data.role} account awaiting approval: ${data.userName}. Submitted: ${data.submittedDate}. Review and approve/reject.`,
  },
};
