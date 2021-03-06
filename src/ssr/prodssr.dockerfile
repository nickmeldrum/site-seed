FROM node:8.0.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g yarn

COPY package.json yarn.lock webpack.config.js /usr/src/app/
RUN yarn

COPY . /usr/src/app
EXPOSE 80

CMD [ "yarn", "ssr" ]
