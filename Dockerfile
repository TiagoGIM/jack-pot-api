FROM node:19-slim As dev

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json /home/app/package.json
COPY package-lock.json /home/app/package-lock.json



RUN npm install

COPY . .

RUN npm run build