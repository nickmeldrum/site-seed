FROM nginx
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./proxy/nickmeldrum.crt /etc/ssl/certs/nickmeldrum.crt
COPY ./proxy/nickmeldrum.key /etc/ssl/private/nickmeldrum.key
COPY ./proxy/* /etc/nginx/
COPY ./proxy/prod.conf /etc/nginx/nginx.conf
COPY ./static /usr/src/app
COPY ./assets /usr/src/app/assets
