import prisma from "../../../lib/prisma";

interface FacultyExamPreferencesInput {
  examNotifications?: boolean;
  violationAlerts?: boolean;
  autoSubmitNotification?: boolean;
  studentProgressUpdates?: boolean;
}

/**
 * Get faculty exam preferences
 * Auto-creates with defaults if not exists
 */
export const getFacultyExamPreferencesService = async (facultyId: number) => {
  try {
    if (!facultyId) {
      throw new Error("Faculty ID is required");
    }

    // Check if preferences exist
    let preferences = await prisma.facultyExamPreferences.findUnique({
      where: { facultyId },
      select: {
        id: true,
        facultyId: true,
        examNotifications: true,
        violationAlerts: true,
        autoSubmitNotification: true,
        studentProgressUpdates: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Auto-create with defaults if not exists
    if (!preferences) {
      preferences = await prisma.facultyExamPreferences.create({
        data: {
          facultyId,
          examNotifications: true,
          violationAlerts: true,
          autoSubmitNotification: true,
          studentProgressUpdates: false,
        },
        select: {
          id: true,
          facultyId: true,
          examNotifications: true,
          violationAlerts: true,
          autoSubmitNotification: true,
          studentProgressUpdates: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      console.log(
        `[FacultyExamPreferencesService] Created default preferences for faculty ${facultyId}`
      );
    }

    return preferences;
  } catch (error) {
    console.error(
      "[FacultyExamPreferencesService] Error fetching preferences:",
      error
    );
    throw error;
  }
};

/**
 * Update faculty exam preferences
 */
export const updateFacultyExamPreferencesService = async (
  facultyId: number,
  data: FacultyExamPreferencesInput
) => {
  try {
    if (!facultyId) {
      throw new Error("Faculty ID is required");
    }

    // Ensure preferences exist first
    const existing = await getFacultyExamPreferencesService(facultyId);

    if (!existing) {
      throw new Error("Failed to initialize preferences");
    }

    // Update only provided fields
    const updated = await prisma.facultyExamPreferences.update({
      where: { facultyId },
      data: {
        ...(data.examNotifications !== undefined && {
          examNotifications: data.examNotifications,
        }),
        ...(data.violationAlerts !== undefined && {
          violationAlerts: data.violationAlerts,
        }),
        ...(data.autoSubmitNotification !== undefined && {
          autoSubmitNotification: data.autoSubmitNotification,
        }),
        ...(data.studentProgressUpdates !== undefined && {
          studentProgressUpdates: data.studentProgressUpdates,
        }),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        facultyId: true,
        examNotifications: true,
        violationAlerts: true,
        autoSubmitNotification: true,
        studentProgressUpdates: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log(
      `[FacultyExamPreferencesService] Updated preferences for faculty ${facultyId}`
    );

    return updated;
  } catch (error) {
    console.error(
      "[FacultyExamPreferencesService] Error updating preferences:",
      error
    );
    throw error;
  }
};
