/*
  Warnings:

  - You are about to drop the column `type` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `Content` table. All the data in the column will be lost.
  - Added the required column `contents` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "type",
DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "contents" JSONB NOT NULL;

-- DropEnum
DROP TYPE "ContentType";
