#!/bin/bash
# Script to migrate project from Windows filesystem to native WSL filesystem

# Define source and destination paths
SRC="/mnt/c/Users/moros/Desktop/solia"
DEST="$HOME/projects/solia"

echo "Creating destination directory: $DEST"
mkdir -p "$DEST"

echo "Copying project files from $SRC to $DEST ..."
cp -r "$SRC/." "$DEST"

echo "Changing directory to $DEST"
cd "$DEST" || exit 1

echo "Installing dependencies with pnpm..."
pnpm install

echo "Migration complete. You can now work in $DEST to avoid permission issues."
