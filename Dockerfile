# Use an official Node runtime as a parent image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Vite uses port 3000 by default for development, but you can configure this as needed
EXPOSE 3000

# Command to start the Vite development server
CMD ["npm", "run", "dev"]