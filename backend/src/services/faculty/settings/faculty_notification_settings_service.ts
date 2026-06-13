import prisma from "../../../lib/prisma";

interface FacultyNotificationSettingsInput {
  inAppNotifications?: boolean;
  dashboardAlerts?: boolean;
}

/**
 * Get faculty notification settings
 * Auto-creates with defaults if not exists
 */
export const getFacultyNotificationSettingsService = async (
  facultyId: number
) => {
  try {
    if (!facultyId) {
      throw new Error("Faculty ID is required");
    }

    // Check if settings exist
    let settings = await prisma.facultyNotificationSettings.findUnique({
      where: { facultyId },
      select: {
        id: true,
        facultyId: true,
        inAppNotifications: true,
        dashboardAlerts: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Auto-create with defaults if not exists
    if (!settings) {
      settings = await prisma.facultyNotificationSettings.create({
        data: {
          facultyId,
          inAppNotifications: true,
          dashboardAlerts: true,
        },
        select: {
          id: true,
          facultyId: true,
          inAppNotifications: true,
          dashboardAlerts: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      console.log(
        `[FacultyNotificationSettingsService] Created default settings for faculty ${facultyId}`
      );
    }

    return settings;
  } catch (error) {
    console.error(
      "[FacultyNotificationSettingsService] Error fetching settings:",
      error
    );
    throw error;
  }
};

/**
 * Update faculty notification settings
 */
export const updateFacultyNotificationSettingsService = async (
  facultyId: number,
  data: FacultyNotificationSettingsInput
) => {
  try {
    if (!facultyId) {
      throw new Error("Faculty ID is required");
    }

    // Ensure settings exist first
    const existing = await getFacultyNotificationSettingsService(facultyId);

    if (!existing) {
      throw new Error("Failed to initialize settings");
    }

    // Update only provided fields
    const updated = await prisma.facultyNotificationSettings.update({
      where: { facultyId },
      data: {
        ...(data.inAppNotifications !== undefined && {
          inAppNotifications: data.inAppNotifications,
        }),
        ...(data.dashboardAlerts !== undefined && {
          dashboardAlerts: data.dashboardAlerts,
        }),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        facultyId: true,
        inAppNotifications: true,
        dashboardAlerts: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log(
      `[FacultyNotificationSettingsService] Updated settings for faculty ${facultyId}`
    );

    return updated;
  } catch (error) {
    console.error(
      "[FacultyNotificationSettingsService] Error updating settings:",
      error
    );
    throw error;
  }
};
