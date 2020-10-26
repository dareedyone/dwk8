FROM node:14-alpine
WORKDIR /usr/src/app/
COPY ./index.js .
RUN chown node "$(pwd)"
USER node
CMD node .
