FROM node:14-buster as builder

WORKDIR /srv

COPY package-lock.json .
COPY package.json .

RUN npm --production i

COPY . .

RUN npm run tsc:build

FROM node:14-buster 
WORKDIR /srv

COPY --from=builder /srv/dist src/ 
COPY --from=builder /srv/node_modules ./node_modules/
COPY package.json .
COPY src/graphql/schema.graphql ./src/graphql/

ARG PORT=3000
ENV HTTP_PORT $PORT
EXPOSE $PORT

CMD ["node","./src/index.js"]