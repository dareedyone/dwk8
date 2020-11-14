FROM node:14-alpine
WORKDIR /usr/src/app/
COPY . .
RUN chown -R node "$(pwd)"
USER node
RUN npm i
EXPOSE 4000
CMD node .
