/*
  Warnings:

  - The primary key for the `orientador_projeto` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "orientador_projeto" DROP CONSTRAINT "orientador_projeto_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "orientador_projeto_pkey" PRIMARY KEY ("id");
