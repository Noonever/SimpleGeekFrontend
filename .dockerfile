# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN npm install

# Build the app for production
RUN npm run build

# Install `serve` to serve your app
RUN npm install -g serve

# Serve the app on port 3000
CMD ["serve", "-s", "dist", "-l", "80"]

# Expose port 3000 to the outside
EXPOSE 80