FROM nginx:1.21.0-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]