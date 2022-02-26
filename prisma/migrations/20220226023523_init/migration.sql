/*
  Warnings:

  - You are about to drop the column `id_versao` on the `sugestao` table. All the data in the column will be lost.
  - You are about to drop the `versao` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mat_aluno]` on the table `trabalho` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "sugestao" DROP CONSTRAINT "sugestao_id_versao_fkey";

-- DropForeignKey
ALTER TABLE "versao" DROP CONSTRAINT "versao_id_trabalho_fkey";

-- AlterTable
ALTER TABLE "sugestao" DROP COLUMN "id_versao";

-- DropTable
DROP TABLE "versao";

-- CreateTable
CREATE TABLE "_AdvisorToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdvisorToProject_AB_unique" ON "_AdvisorToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvisorToProject_B_index" ON "_AdvisorToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "trabalho_mat_aluno_key" ON "trabalho"("mat_aluno");

-- AddForeignKey
ALTER TABLE "_AdvisorToProject" ADD FOREIGN KEY ("A") REFERENCES "professor"("siape") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvisorToProject" ADD FOREIGN KEY ("B") REFERENCES "trabalho"("id") ON DELETE CASCADE ON UPDATE CASCADE;
