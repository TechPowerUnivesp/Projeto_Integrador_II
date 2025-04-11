FROM node:22-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Create an environment file that can be used at build time
RUN echo "VITE_API_URL=/api" > .env

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]