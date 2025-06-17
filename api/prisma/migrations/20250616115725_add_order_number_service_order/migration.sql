/*
  Warnings:

  - Added the required column `orderNumber` to the `ServiceOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceOrder" ADD COLUMN     "orderNumber" TEXT NOT NULL;
