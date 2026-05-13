/*
  Warnings:

  - You are about to drop the column `dbType` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `encryptedDbUri` on the `App` table. All the data in the column will be lost.
  - Added the required column `databaseId` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('WAITING', 'LIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "App" DROP COLUMN "dbType",
DROP COLUMN "encryptedDbUri",
ADD COLUMN     "databaseId" TEXT NOT NULL,
ADD COLUMN     "status" "AppStatus" NOT NULL DEFAULT 'WAITING';

-- CreateTable
CREATE TABLE "Database" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dbType" "DbType" NOT NULL,
    "encryptedDbUri" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastHealthAt" TIMESTAMP(3),
    "isHealthy" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Database_userId_idx" ON "Database"("userId");

-- CreateIndex
CREATE INDEX "App_databaseId_idx" ON "App"("databaseId");

-- AddForeignKey
ALTER TABLE "Database" ADD CONSTRAINT "Database_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "Database"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
