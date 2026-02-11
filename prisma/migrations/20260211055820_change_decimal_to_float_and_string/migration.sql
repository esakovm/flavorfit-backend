/*
  Warnings:

  - You are about to alter the column `quantity` on the `recipe_ingredients` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "ingredients" ALTER COLUMN "price" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "recipe_ingredients" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;
