FROM nginx:alpine
COPY . /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
COPY config.js.example config.js
