-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatar` LONGBLOB NULL,
    ADD COLUMN `avatarMimeType` VARCHAR(191) NULL;
