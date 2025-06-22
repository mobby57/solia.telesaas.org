#!/bin/bash
# Cleanup old npm artifacts from the Solia monorepo root and packages

echo "Removing node_modules folders..."
rm -rf node_modules
rm -rf backend/node_modules frontend/node_modules

echo "Removing package-lock.json files..."
rm -f package-lock.json
rm -f backend/package-lock.json backend/package-lock.json

echo "Cleanup complete. You can now run 'pnpm install' at the root."
