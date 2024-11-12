# Use Node.js official image
FROM node:16-alpine

# Install nodemon globally
RUN npm install -g nodemon

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose port 3000 for the app
EXPOSE 3000

# Start the app with nodemon
CMD ["nodemon", "src/app.js"]
