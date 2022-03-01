/*
  Warnings:

  - Added the required column `arquivo` to the `sugestao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sugestao" ADD COLUMN     "arquivo" TEXT NOT NULL;
