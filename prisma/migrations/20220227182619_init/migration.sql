/*
  Warnings:

  - You are about to drop the `trabalho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orientador_projeto" DROP CONSTRAINT "orientador_projeto_id_projeto_fkey";

-- DropForeignKey
ALTER TABLE "trabalho" DROP CONSTRAINT "trabalho_mat_aluno_fkey";

-- DropTable
DROP TABLE "trabalho";

-- CreateTable
CREATE TABLE "projeto" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "mat_aluno" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projeto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projeto_mat_aluno_key" ON "projeto"("mat_aluno");

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "projeto_mat_aluno_fkey" FOREIGN KEY ("mat_aluno") REFERENCES "aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orientador_projeto" ADD CONSTRAINT "orientador_projeto_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
