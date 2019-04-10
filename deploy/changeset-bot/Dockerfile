FROM node:10

COPY . /opt/service/
WORKDIR /opt/service/

RUN yarn install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
