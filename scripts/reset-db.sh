#!/bin/bash
# Script to reset the MongoDB database
echo "Resetting MongoDB database..."
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set."
  exit 1
fi

# Extract database name from DATABASE_URL
DB_NAME=$(echo $DATABASE_URL | sed -E 's|.*\/([^\/?]+)(\?.*)?$|\\1|')

if [ -z "$DB_NAME" ]; then
  echo "Error: Could not extract database name from DATABASE_URL."
  exit 1
fi

# Drop the database
mongo $DATABASE_URL --eval "db.getSiblingDB('$DB_NAME').dropDatabase()"
echo "Database $DB_NAME has been reset."
