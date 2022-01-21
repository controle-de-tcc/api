# Controle de TCC - API

### API para o um projeto desenvolvido durante a disciplina de Projeto e Desenvolvimento de Sistemas que tem como objetivo simplifcar a manutenção de trabalhos de conclusão de curso pelo aluno e seu(s) orientador(es).

## Como rodar
1. Configurar [docker](https://docs.docker.com/get-docker/)
2. Configurar [docker-compose](https://docs.docker.com/compose/install/)
3. Clonar respositório
4. Rodar serviços **postgres** e **node** do docker-compose com o comando `docker-compose up --build`

Também é possível rodar somente o container do **postgres** e rodar a API node localmente, para isso:
1. Rode somente o serviço **postgres** do docker-compose com o comando `docker-compose up --build postgres`
2. Renomeie o arquivo `.env.example` para `.env`
3. Instale as bibliotecas necessárias com o comando `yarn` (preferível) ou `npm install`
4. Rode as migrations do `Prisma` com o comando `npx prisma migrate dev --name init`
5. Instale o nodemon globalmente em sua máquina com o comando `yarn global add nodemon` ou `npm install -g nodemon`
6. Rode o comando `yarn start` (preverível) ou `npm run start` a partir do diretório inicial
