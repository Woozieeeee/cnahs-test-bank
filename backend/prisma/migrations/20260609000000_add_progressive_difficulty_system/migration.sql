-- Add DifficultyThreshold table
CREATE TABLE IF NOT EXISTS `DifficultyThreshold` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `subjectId` INT NOT NULL,
    `difficulty` ENUM('EASY', 'MEDIUM', 'HARD', 'EXPERT') NOT NULL,
    `passingScore` INT NOT NULL DEFAULT 75,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DifficultyThreshold_subjectId_difficulty_key`(`subjectId`, `difficulty`),
    INDEX `DifficultyThreshold_subjectId_idx`(`subjectId`),
    PRIMARY KEY (`id`),
    CONSTRAINT `DifficultyThreshold_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add SubjectEnrollment table
CREATE TABLE IF NOT EXISTS `SubjectEnrollment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `studentId` INT NOT NULL,
    `subjectId` INT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SubjectEnrollment_studentId_subjectId_key`(`studentId`, `subjectId`),
    INDEX `SubjectEnrollment_studentId_idx`(`studentId`),
    INDEX `SubjectEnrollment_subjectId_idx`(`subjectId`),
    PRIMARY KEY (`id`),
    CONSTRAINT `SubjectEnrollment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User` (`id`) ON DELETE CASCADE,
    CONSTRAINT `SubjectEnrollment_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add SubjectProgress table
CREATE TABLE IF NOT EXISTS `SubjectProgress` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `studentId` INT NOT NULL,
    `subjectId` INT NOT NULL,
    `easyScore` INT NOT NULL DEFAULT 0,
    `mediumScore` INT NOT NULL DEFAULT 0,
    `hardScore` INT NOT NULL DEFAULT 0,
    `expertScore` INT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SubjectProgress_studentId_subjectId_key`(`studentId`, `subjectId`),
    INDEX `SubjectProgress_studentId_idx`(`studentId`),
    INDEX `SubjectProgress_subjectId_idx`(`subjectId`),
    PRIMARY KEY (`id`),
    CONSTRAINT `SubjectProgress_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User` (`id`) ON DELETE CASCADE,
    CONSTRAINT `SubjectProgress_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
