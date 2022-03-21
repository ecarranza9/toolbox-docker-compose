FROM node:16

WORKDIR /usr/src/toolbox-frontend

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]