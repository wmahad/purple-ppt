/*
  Warnings:

  - Added the required column `description` to the `Presentation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Presentation" ADD COLUMN     "description" TEXT NOT NULL;
