/*
  Warnings:

  - You are about to drop the column `createdAt` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `tipoProfessor` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sugestao` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sugestao` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `trabalho` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `trabalho` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_professor` to the `professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sugestao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `trabalho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "professor" DROP COLUMN "createdAt",
DROP COLUMN "tipoProfessor",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tipo_professor" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sugestao" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "trabalho" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
