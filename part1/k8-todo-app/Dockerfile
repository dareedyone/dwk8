FROM node:14-alpine
WORKDIR /usr/src/app/
COPY . .
RUN chown node "$(pwd)"
USER node
RUN npm i
EXPOSE 3001
CMD node .
