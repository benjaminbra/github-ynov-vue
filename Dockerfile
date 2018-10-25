FROM nginx:alpine
COPY . /usr/share/nginx/html
CMD cp /usr/share/nginx/html/config.js.example /usr/share/nginx/html/config.js
