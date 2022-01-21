FROM node:12

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn
RUN yarn global add nodemon

COPY . .

CMD ["yarn", "start.dev"]