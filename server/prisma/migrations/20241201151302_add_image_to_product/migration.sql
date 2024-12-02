/*
  Warnings:

  - You are about to drop the column `image` on the `Products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kodeProduk]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kodeProduk` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "image",
ADD COLUMN     "kodeProduk" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Products_kodeProduk_key" ON "Products"("kodeProduk");
