FROM node:20

WORKDIR /app
COPY . .
COPY ../prisma ./prisma
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm prisma generate --schema=./prisma/schema.prisma
RUN pnpm build
RUN ls -l dist

CMD ["pnpm", "start"]
