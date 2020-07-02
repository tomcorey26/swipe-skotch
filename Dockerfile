FROM node:latest

WORKDIR /skotch

COPY ./package.json . 
COPY ./packages/server/package.json ./packages/server 
COPY ./packages/common/package.json ./packages/common

RUN npm i -g yarn
RUN yarn install --production

COPY ./packages/server/dist/ ./packages/server 
COPY ./packages/common/dist/ ./packages/common 

WORKDIR /packages/server

ENV NODE_ENV production

EXPOSE 80

CMD [ "node", "dist/index.js" ]