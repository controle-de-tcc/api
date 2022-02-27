/*
  Warnings:

  - You are about to drop the `_AdvisorToProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdvisorToProject" DROP CONSTRAINT "_AdvisorToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdvisorToProject" DROP CONSTRAINT "_AdvisorToProject_B_fkey";

-- DropTable
DROP TABLE "_AdvisorToProject";

-- CreateTable
CREATE TABLE "orientador_projeto" (
    "id_projeto" INTEGER NOT NULL,
    "siape" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orientador_projeto_pkey" PRIMARY KEY ("id_projeto","siape")
);

-- CreateIndex
CREATE UNIQUE INDEX "orientador_projeto_id_projeto_key" ON "orientador_projeto"("id_projeto");

-- CreateIndex
CREATE UNIQUE INDEX "orientador_projeto_siape_key" ON "orientador_projeto"("siape");

-- AddForeignKey
ALTER TABLE "orientador_projeto" ADD CONSTRAINT "orientador_projeto_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "trabalho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orientador_projeto" ADD CONSTRAINT "orientador_projeto_siape_fkey" FOREIGN KEY ("siape") REFERENCES "professor"("siape") ON DELETE RESTRICT ON UPDATE CASCADE;
