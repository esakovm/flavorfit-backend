/*
  Warnings:

  - You are about to drop the column `thing` on the `body_measurements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "body_measurements" DROP COLUMN "thing",
ADD COLUMN     "thigh" INTEGER;
