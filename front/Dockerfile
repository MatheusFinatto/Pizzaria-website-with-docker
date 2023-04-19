FROM node:14

WORKDIR /front

COPY ./front/package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]