# Use an official Node.js 18 lightweight image (based on Alpine Linux) as the base
FROM node:18-alpine

# Set the working directory inside the container to /app
# All following commands will run relative to this folder
WORKDIR /app

# Copy package.json and package-lock.json (if exists) into /app
# This helps leverage Docker layer caching (dependencies only reinstalled if these files change)
COPY package*.json ./

# Install dependencies using npm ci (clean install, reproducible builds)
RUN npm ci

# Copy the rest of the application code into /app
COPY . .
