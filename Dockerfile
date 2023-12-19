FROM node:16.3-alpine As dev

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json /home/app/package.json
COPY package-lock.json /home/app/package-lock.json

RUN npm install

COPY . .

RUN npm run build