/*
  Warnings:

  - Added the required column `id_projeto` to the `versao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "versao" ADD COLUMN     "id_projeto" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "versao" ADD CONSTRAINT "versao_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
