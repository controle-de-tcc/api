/*
  Warnings:

  - You are about to drop the `orientador_projeto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `siape_orientador` to the `projeto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orientador_projeto" DROP CONSTRAINT "orientador_projeto_id_projeto_fkey";

-- DropForeignKey
ALTER TABLE "orientador_projeto" DROP CONSTRAINT "orientador_projeto_siape_fkey";

-- AlterTable
ALTER TABLE "projeto" ADD COLUMN     "siape_orientador" INTEGER NOT NULL;

-- DropTable
DROP TABLE "orientador_projeto";

-- CreateTable
CREATE TABLE "avaliador_projeto" (
    "id_projeto" INTEGER NOT NULL,
    "siape" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliador_projeto_pkey" PRIMARY KEY ("id_projeto","siape")
);

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "projeto_siape_orientador_fkey" FOREIGN KEY ("siape_orientador") REFERENCES "professor"("siape") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliador_projeto" ADD CONSTRAINT "avaliador_projeto_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliador_projeto" ADD CONSTRAINT "avaliador_projeto_siape_fkey" FOREIGN KEY ("siape") REFERENCES "professor"("siape") ON DELETE RESTRICT ON UPDATE CASCADE;
