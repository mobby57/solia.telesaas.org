#!/bin/sh
# Script to clean pnpm virtual store and node_modules, then reinstall dependencies

echo "Removing node_modules directory..."
rm -rf node_modules

echo "Removing .pnpm-store directory if it exists..."
rm -rf .pnpm-store

echo "Removing .pnpm directory if it exists..."
rm -rf .pnpm

echo "Running pnpm install to reinstall dependencies..."
pnpm install

echo "Done."
