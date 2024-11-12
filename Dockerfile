# Use Node.js official image
FROM node:16-alpine

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and the rest of the project
COPY prisma ./prisma/
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Start the app with nodemon
CMD ["nodemon", "src/app.js"]
