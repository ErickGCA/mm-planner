FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]