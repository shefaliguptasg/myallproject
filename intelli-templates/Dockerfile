# FROM node:14-alpine

# Set the working directory
# WORKDIR /usr/src/react-app

# Copy the package.json and package-lock.json
# COPY package*.json ./

# Copy the source code
# COPY build .

# Install the serve package globally
# RUN npm install -g serve

# Expose port 3000
# EXPOSE 3030

# Start the development server on port 3000
# CMD ["npm", "start", "--", "--port", "3000"]
# CMD ["serve", "-s", ".", "-l", "3031"]
# CMD ["npm", "start", "--", "--port", "3000"]

FROM nginx:latest

WORKDIR /usr/src/react-app

# COPY package*.json ./
COPY build /usr/share/nginx/html
COPY nginx.conf /usr/share/nginx

EXPOSE 80