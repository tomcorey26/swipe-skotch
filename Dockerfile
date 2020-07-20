FROM node:latest

WORKDIR /skotch

COPY ./package.json . 
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

# RUN ls ./pa

RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/server/.env ./packages/server/.env
COPY ./packages/common/dist ./packages/common/dist

WORKDIR ./packages/server

ENV NODE_ENV production

EXPOSE 4000 


CMD [ "node", "dist/index.js" ]