FROM nginx
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
  yarn

COPY ./proxy/nickmeldrum.crt /etc/ssl/certs/nickmeldrum.crt
COPY ./proxy/nickmeldrum.key /etc/ssl/private/nickmeldrum.key
COPY ./proxy/* /etc/nginx/
COPY ./proxy/prod.conf /etc/nginx/nginx.conf

COPY package.json webpack.config.js src/client /usr/src/app/

RUN yarn install && \
  yarn run build && \
  rm -rf node_modules src webpack.config.js package.json

COPY ./static /usr/src/app
COPY ./assets /usr/src/app/assets
