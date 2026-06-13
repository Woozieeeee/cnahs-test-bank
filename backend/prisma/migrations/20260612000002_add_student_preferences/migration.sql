-- Create StudentPreferences table
CREATE TABLE `StudentPreferences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `studentId` INT NOT NULL,
  `pushNotifications` BOOLEAN NOT NULL DEFAULT true,
  `examReminders` BOOLEAN NOT NULL DEFAULT true,
  `soundEnabled` BOOLEAN NOT NULL DEFAULT true,
  `studyGoals` BOOLEAN NOT NULL DEFAULT true,
  `analyticsTracking` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `StudentPreferences_studentId_key`(`studentId`),
  INDEX `StudentPreferences_studentId_idx`(`studentId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add foreign key constraint
ALTER TABLE `StudentPreferences` ADD CONSTRAINT `StudentPreferences_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
