FROM nginx
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./proxy/cert/siteseed-cert.crt /etc/ssl/certs/siteseed-cert.crt
COPY ./proxy/cert/siteseed-cert.key /etc/ssl/private/siteseed-cert.key
COPY ./proxy/* /etc/nginx/
COPY ./proxy/dev.conf /etc/nginx/nginx.conf
