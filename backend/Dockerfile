# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY apps/backend/package.json apps/backend/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Copy backend source code
COPY apps/backend .

# Build the backend
RUN pnpm run build

# Expose port (adjust if needed)
EXPOSE 3000

# Start the backend server
CMD ["node", "dist/main.js"]
