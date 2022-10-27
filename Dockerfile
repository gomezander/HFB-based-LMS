FROM node:alpine

VOLUME /hostpipe

RUN mkdir -p /usr/src/agent-node-influx

RUN mkdir -p /usr/src/agent-node-influx/blockchain

RUN mkdir -p /usr/src/agent-node-influx/node-agent

WORKDIR /usr/src/agent-node-influx

COPY ./node-agent/package*.json .

COPY ./blockchain/. ./blockchain/

ADD ./all_commands.sh .

COPY ./node-agent ./node-agent

RUN chmod +x ./all_commands.sh

RUN npm install

#RUN sh ./all_commands.sh

#CMD ["sh", "./all_commands.sh"]
CMD [ "npm", "start" ]
#CMD [ "ls", "blockchain"]
#CMD [ "node", "node-agent" ]




