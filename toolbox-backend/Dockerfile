FROM node:14-slim

WORKDIR /usr/src/toolbox-backend

COPY ./package.json ./
COPY ./package-lock.json  ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]