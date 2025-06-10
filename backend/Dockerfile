# Étape build
FROM node:20-alpine AS builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend .

# Étape run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "run", "dev"]
