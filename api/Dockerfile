FROM node:22

RUN npm i -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm i 

COPY . .

RUN pnpm run prisma:generate && pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]