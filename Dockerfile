# Use lightweight Node.js Alpine base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source code
COPY index.html ./
COPY server.js ./

# Expose server port (default 3000)
EXPOSE 3000

# Set Node.js production environment
ENV NODE_ENV=production

# Command to run the application
CMD [ "npm", "start" ]
