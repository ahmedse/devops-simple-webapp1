FROM node:14
WORKDIR /app

# Copy package files and clean cache
COPY package*.json ./
RUN npm cache clean --force
RUN npm install

# Copy rest of the application
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]