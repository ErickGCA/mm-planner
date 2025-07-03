
FROM node:20-alpine AS development

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3333
CMD [ "npm", "run", "dev" ]
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/prisma ./prisma
RUN npx prisma generate
RUN npm run build
EXPOSE 3333
CMD [ "node", "dist/server.js" ]