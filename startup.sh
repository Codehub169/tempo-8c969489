#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Navigate to the script's directory (optional, if you run it from project root)
# cd "$(dirname "$0")"

# Inform the user
echo "Installing project dependencies..."

# Install dependencies
npm install

# Inform the user
echo "Clearing Next.js cache..."

# Remove the .next directory to ensure a clean build
rm -rf .next

# Inform the user
echo "Starting the development server on port 9000..."

# Run the development server
# The package.json script "dev" is set to "next dev -p 9000"
npm run dev