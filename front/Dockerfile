FROM node:14

WORKDIR /front

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]