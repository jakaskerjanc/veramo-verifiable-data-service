FROM node:23.10.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:23.10.0

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/swagger ./swagger

EXPOSE 3000

CMD [ "npm", "run", "start" ]