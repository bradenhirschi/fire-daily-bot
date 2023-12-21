# Use official base image
FROM node:18

# Set working directory in container
WORKDIR /app
 
# Copy package.json and package-lock.json to the container
COPY package*.json ./
 
# Install dependencies
RUN npm install

# Copy all files over
COPY . .

# Build typescript
RUN npm run build
 
# Start program
CMD [ "npm", "start" ]