/*
  Warnings:

  - You are about to drop the column `recipeId` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `recipe_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_recipeId_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
