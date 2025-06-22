#!/bin/bash
# Script to seed the MongoDB database with initial data
echo "Seeding MongoDB database..."
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set."
  exit 1
fi

# Run a Node.js seed script if exists
if [ -f "./backend/prisma/seed.js" ]; then
  node ./backend/prisma/seed.js
else
  echo "No seed script found at ./backend/prisma/seed.js. Please create one to seed your database."
fi
