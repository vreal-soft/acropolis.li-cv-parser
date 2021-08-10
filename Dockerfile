FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
RUN npm i -g ts-node
RUN npm i -g typescript

COPY . .

CMD ts-node ./src/server.ts