#Build

FROM node:22 AS builder

RUN npm i -g pnpm

WORKDIR /app

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm i && pnpm build 

#Prod
FROM node:22 AS runner

RUN npm i -g pnpm

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 4000

CMD ["pnpm", "start"]