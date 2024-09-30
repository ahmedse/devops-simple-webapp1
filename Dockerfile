FROM node:14
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# List contents of /app to debug
RUN ls -la

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]