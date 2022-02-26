-- CreateTable
CREATE TABLE "professor" (
    "siape" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipoProfessor" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("siape")
);

-- CreateTable
CREATE TABLE "aluno" (
    "matricula" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "trabalho" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "mat_aluno" INTEGER NOT NULL,

    CONSTRAINT "trabalho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "versao" (
    "id" SERIAL NOT NULL,
    "id_trabalho" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "versao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sugestao" (
    "id" SERIAL NOT NULL,
    "valor" VARCHAR(500) NOT NULL,
    "siape_professor" INTEGER NOT NULL,
    "id_versao" INTEGER NOT NULL,

    CONSTRAINT "sugestao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_key" ON "professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "aluno"("email");

-- AddForeignKey
ALTER TABLE "trabalho" ADD CONSTRAINT "trabalho_mat_aluno_fkey" FOREIGN KEY ("mat_aluno") REFERENCES "aluno"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "versao" ADD CONSTRAINT "versao_id_trabalho_fkey" FOREIGN KEY ("id_trabalho") REFERENCES "trabalho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sugestao" ADD CONSTRAINT "sugestao_siape_professor_fkey" FOREIGN KEY ("siape_professor") REFERENCES "professor"("siape") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sugestao" ADD CONSTRAINT "sugestao_id_versao_fkey" FOREIGN KEY ("id_versao") REFERENCES "versao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
