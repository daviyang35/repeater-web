FROM nginx:1.17
WORKDIR /web/
EXPOSE 8080/TCP
ENV NODE_ENV production
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist.tgz .
RUN tar -zxf dist.tgz &&rm -rf dist.tgz
