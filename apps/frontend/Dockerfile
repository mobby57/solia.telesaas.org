# Production-ready Dockerfile for frontend (Next.js)
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY apps/frontend/package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/frontend/ .

# Build the frontend
RUN pnpm run build

# Production image
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only production dependencies
COPY apps/frontend/package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Expose frontend port
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]
