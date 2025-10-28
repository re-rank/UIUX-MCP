# KRDS UI/UX MCP Server - Dockerfile

FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build

# Expose (not required for stdio MCP, but harmless)
EXPOSE 3000

# Start MCP server
CMD ["node", "build/index.js"]
