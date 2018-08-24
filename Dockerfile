FROM node:carbon as node

ARG CONFIG_ENV=$CONFIG_ENV

RUN mkdir /voice-microsite
WORKDIR /voice-microsite

ADD yarn.lock yarn.lock
ADD package.json package.json
RUN yarn install

ARG CONFIG_ENV=$CONFIG_ENV
ADD . /voice-microsite
RUN yarn build

FROM nginx:1.13
COPY --from=node /voice-microsite/dist /voice-microsite
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
