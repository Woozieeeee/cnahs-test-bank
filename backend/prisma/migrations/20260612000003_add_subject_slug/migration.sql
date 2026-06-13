-- Add slug column to Subject table
ALTER TABLE `Subject` ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT '';

-- Update existing subjects with slugs based on their names
-- This converts the name to lowercase and replaces spaces with hyphens
UPDATE `Subject` 
SET `slug` = LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(`name`, ' ', '-'), '&', 'and'), '@', 'at'), '#', 'number'), '$', 'dollar'), '%', 'percent'), '^', 'caret'), '*', 'star'), '+', 'plus'), '.', '-'), ',', ''))
WHERE `slug` = '';

-- Add unique constraint on slug
ALTER TABLE `Subject` ADD UNIQUE INDEX `Subject_slug_key`(`slug`);
