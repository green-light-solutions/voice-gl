FROM node:carbon

RUN apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /voice-microsite
WORKDIR /voice-microsite

ADD yarn.lock yarn.lock
ADD package.json package.json
RUN yarn

ARG CONFIG_ENV=$CONFIG_ENV
ADD . /voice-microsite
RUN yarn build

WORKDIR /voice-microsite/dist

CMD ["nginx", "-g", "daemon off;"]
