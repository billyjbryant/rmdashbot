FROM node:12

WORKDIR /usr/src/rmdashbot

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD [ "npm", "start" ]