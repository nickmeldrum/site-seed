FROM nginx
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && \
  apt-get install -y \
    curl && \
  apt-get install -my \
    wget gnupg && \
  apt-get remove -y \
    cmdtest

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && \
  apt-get install -y \
    nodejs
RUN npm install -g yarn

COPY ./proxy/cert/siteseed-cert.crt /etc/ssl/certs/siteseed-cert.crt
COPY ./proxy/cert/siteseed-cert.key /etc/ssl/private/siteseed-cert.key
COPY ./proxy/* /etc/nginx/
COPY ./proxy/prod.conf /etc/nginx/nginx.conf

COPY package.json yarn.lock webpack.config.js /usr/src/app/
RUN yarn

COPY src/ui /usr/src/app/src/ui
RUN yarn ui && \
  rm -rf ./src ./node_modules package.json yarn.lock webpack.config.js

COPY ./src/static /usr/src/app
