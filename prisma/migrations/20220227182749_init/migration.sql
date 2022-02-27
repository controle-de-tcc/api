/*
  Warnings:

  - The primary key for the `orientador_projeto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `orientador_projeto` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "orientador_projeto_id_projeto_key";

-- DropIndex
DROP INDEX "orientador_projeto_siape_key";

-- AlterTable
ALTER TABLE "orientador_projeto" DROP CONSTRAINT "orientador_projeto_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "orientador_projeto_pkey" PRIMARY KEY ("id_projeto", "siape");
