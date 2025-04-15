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
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    # Frontend static files \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
        index index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]