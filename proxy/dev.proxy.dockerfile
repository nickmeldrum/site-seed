FROM nginx
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./proxy/$SITESEEDDOMAIN.crt /etc/ssl/certs/$SITESEEDDOMAIN.crt
COPY ./proxy/$SITESEEDDOMAIN.key /etc/ssl/private/$SITESEEDDOMAIN.key
COPY ./proxy/* /etc/nginx/
COPY ./proxy/prod.conf /etc/nginx/nginx.conf
