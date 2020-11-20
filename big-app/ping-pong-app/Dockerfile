FROM node:14-alpine
WORKDIR /usr/src/app/
COPY . .
RUN chown -R node "$(pwd)" && chmod -R +rwx ./files 
USER node
RUN npm i
EXPOSE 3000
CMD node .
