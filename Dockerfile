# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else
COPY . .

# Expose Cloud Run port
EXPOSE 8080

# Start app
CMD ["npm", "start"]