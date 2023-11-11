/*
  Warnings:

  - Changed the type of `expires_in` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" INTEGER NOT NULL;
