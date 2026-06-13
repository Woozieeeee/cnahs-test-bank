-- CreateTable SystemSettings
CREATE TABLE `SystemSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionTimeoutHours` INTEGER NOT NULL DEFAULT 24,
    `maxLoginAttempts` INTEGER NOT NULL DEFAULT 5,
    `dataRetentionDays` INTEGER NOT NULL DEFAULT 90,
    `maxConcurrentUsers` INTEGER NOT NULL DEFAULT 1000,
    `passwordExpiryDays` INTEGER NOT NULL DEFAULT 90,
    `forcePasswordExpiry` BOOLEAN NOT NULL DEFAULT true,
    `enableTwoFactor` BOOLEAN NOT NULL DEFAULT false,
    `trackLoginHistory` BOOLEAN NOT NULL DEFAULT true,
    `enableIpWhitelist` BOOLEAN NOT NULL DEFAULT false,
    `ipWhitelistJson` JSON NULL,
    `inAppNotifications` BOOLEAN NOT NULL DEFAULT true,
    `dashboardAlerts` BOOLEAN NOT NULL DEFAULT true,
    `criticalSystemAlerts` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SystemSettings_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable LoginHistory
CREATE TABLE `LoginHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `loginTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `logoutTime` DATETIME(3) NULL,
    `success` BOOLEAN NOT NULL DEFAULT true,

    INDEX `LoginHistory_userId_idx`(`userId`),
    INDEX `LoginHistory_loginTime_idx`(`loginTime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LoginHistory` ADD CONSTRAINT `LoginHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
