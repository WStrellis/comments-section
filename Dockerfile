FROM node:14-buster as builder

COPY package-lock.json .
COPY package.json .

RUN npm --production i

COPY . .

RUN npm run tsc:build

FROM node:14-buster 
WORKDIR /srv

COPY --from=builder dist src/ 
COPY --from=builder node_modules ./node_modules/
COPY package.json .
COPY src/graphql/schema.graphql ./src/graphql/

ARG PORT=3000
ENV HTTP_PORT $PORT
EXPOSE $PORT

CMD ["node","./src/index.js"]