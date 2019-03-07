FROM nginx:1.13
ADD compiled /voice-microsite
COPY --from=node /voice-microsite/dist /voice-microsite
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
