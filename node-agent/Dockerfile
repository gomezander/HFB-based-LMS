FROM node:alpine

RUN mkdir -p /usr/src/agent-node-influx

WORKDIR /usr/src/agent-node-influx

COPY package*.json ./

#COPY ../../blockchain/ /usr/src/

RUN npm install

COPY . . 

CMD [ "npm", "start" ]




