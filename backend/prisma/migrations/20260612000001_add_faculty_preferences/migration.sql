-- Create FacultyExamPreferences table
CREATE TABLE `FacultyExamPreferences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `facultyId` INT NOT NULL,
  `examNotifications` BOOLEAN NOT NULL DEFAULT true,
  `violationAlerts` BOOLEAN NOT NULL DEFAULT true,
  `autoSubmitNotification` BOOLEAN NOT NULL DEFAULT true,
  `studentProgressUpdates` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `FacultyExamPreferences_facultyId_key`(`facultyId`),
  INDEX `FacultyExamPreferences_facultyId_idx`(`facultyId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create FacultyNotificationSettings table
CREATE TABLE `FacultyNotificationSettings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `facultyId` INT NOT NULL,
  `inAppNotifications` BOOLEAN NOT NULL DEFAULT true,
  `dashboardAlerts` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `FacultyNotificationSettings_facultyId_key`(`facultyId`),
  INDEX `FacultyNotificationSettings_facultyId_idx`(`facultyId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add foreign key constraints
ALTER TABLE `FacultyExamPreferences` ADD CONSTRAINT `FacultyExamPreferences_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `FacultyNotificationSettings` ADD CONSTRAINT `FacultyNotificationSettings_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
