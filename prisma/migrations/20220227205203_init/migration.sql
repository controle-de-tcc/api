/*
  Warnings:

  - You are about to drop the column `valor` on the `sugestao` table. All the data in the column will be lost.
  - Added the required column `id_versao` to the `sugestao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texto` to the `sugestao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sugestao" DROP COLUMN "valor",
ADD COLUMN     "id_versao" INTEGER NOT NULL,
ADD COLUMN     "texto" VARCHAR(500) NOT NULL;

-- CreateTable
CREATE TABLE "versao" (
    "id" SERIAL NOT NULL,
    "arquivo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "versao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sugestao" ADD CONSTRAINT "sugestao_id_versao_fkey" FOREIGN KEY ("id_versao") REFERENCES "versao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
