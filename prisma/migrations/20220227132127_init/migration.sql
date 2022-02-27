/*
  Warnings:

  - Added the required column `updatedAt` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `sugestao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `trabalho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "professor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sugestao" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "trabalho" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
