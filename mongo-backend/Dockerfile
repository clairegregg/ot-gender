# Use official Node.js base image
FROM node:20-alpine

# Set work directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Install dependencies
RUN npm install --production

# Transpile TS
RUN npm install -g typescript && tsc

# Expose port
EXPOSE 6440

# Start app
CMD ["node", "dist/index.js"]
