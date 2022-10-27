FROM node:alpine

RUN mkdir -p /usr/src/setup-bchain

WORKDIR /usr/src/setup-bchain

COPY . .

RUN chmod +x ./start.sh

CMD [ "/start.sh" ]
#CMD [ "ls", "./node-agent/src" ]
#CMD [ "node", "node-agent" ]