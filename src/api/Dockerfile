FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production

# Update the database configuration to use environment variables
COPY . .

EXPOSE 3001

CMD ["node", "server.js"]