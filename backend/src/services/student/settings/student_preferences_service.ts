import prisma from "../../../lib/prisma";

interface StudentPreferencesInput {
  pushNotifications?: boolean;
  examReminders?: boolean;
  soundEnabled?: boolean;
  studyGoals?: boolean;
  analyticsTracking?: boolean;
}

/**
 * Get student preferences
 * Auto-creates with defaults if not exists
 */
export const getStudentPreferencesService = async (studentId: number) => {
  try {
    if (!studentId) {
      throw new Error("Student ID is required");
    }

    // Check if preferences exist
    let preferences = await prisma.studentPreferences.findUnique({
      where: { studentId },
      select: {
        id: true,
        studentId: true,
        pushNotifications: true,
        examReminders: true,
        soundEnabled: true,
        studyGoals: true,
        analyticsTracking: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Auto-create with defaults if not exists
    if (!preferences) {
      preferences = await prisma.studentPreferences.create({
        data: {
          studentId,
          pushNotifications: true,
          examReminders: true,
          soundEnabled: true,
          studyGoals: true,
          analyticsTracking: false,
        },
        select: {
          id: true,
          studentId: true,
          pushNotifications: true,
          examReminders: true,
          soundEnabled: true,
          studyGoals: true,
          analyticsTracking: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      console.log(
        `[StudentPreferencesService] Created default preferences for student ${studentId}`
      );
    }

    return preferences;
  } catch (error) {
    console.error(
      "[StudentPreferencesService] Error fetching preferences:",
      error
    );
    throw error;
  }
};

/**
 * Update student preferences
 */
export const updateStudentPreferencesService = async (
  studentId: number,
  data: StudentPreferencesInput
) => {
  try {
    if (!studentId) {
      throw new Error("Student ID is required");
    }

    // Ensure preferences exist first
    const existing = await getStudentPreferencesService(studentId);

    if (!existing) {
      throw new Error("Failed to initialize preferences");
    }

    // Validate that at least one field is provided
    const hasValidData = Object.values(data).some((val) => val !== undefined);
    if (!hasValidData) {
      throw new Error("At least one preference field must be provided");
    }

    // Update only provided fields
    const updated = await prisma.studentPreferences.update({
      where: { studentId },
      data: {
        ...(data.pushNotifications !== undefined && {
          pushNotifications: data.pushNotifications,
        }),
        ...(data.examReminders !== undefined && {
          examReminders: data.examReminders,
        }),
        ...(data.soundEnabled !== undefined && {
          soundEnabled: data.soundEnabled,
        }),
        ...(data.studyGoals !== undefined && {
          studyGoals: data.studyGoals,
        }),
        ...(data.analyticsTracking !== undefined && {
          analyticsTracking: data.analyticsTracking,
        }),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        studentId: true,
        pushNotifications: true,
        examReminders: true,
        soundEnabled: true,
        studyGoals: true,
        analyticsTracking: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log(
      `[StudentPreferencesService] Updated preferences for student ${studentId}`
    );

    return updated;
  } catch (error) {
    console.error(
      "[StudentPreferencesService] Error updating preferences:",
      error
    );
    throw error;
  }
};
