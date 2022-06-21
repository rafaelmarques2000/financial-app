FROM nginx:latest

RUN rm /usr/share/nginx/html/index.html

COPY dist /usr/share/nginx/html


RUN chmod -R 777 /usr/share/nginx/html

COPY docker/nginx/nginx.conf /etc/nginx/conf.d/