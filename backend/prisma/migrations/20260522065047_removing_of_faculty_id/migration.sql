/*
  Warnings:

  - You are about to drop the column `facultyId` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_facultyId_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `facultyId`;
