FROM node:19-slim As dev

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json /home/app/package.json
COPY package-lock.json /home/app/package-lock.json




RUN npm install
RUN npm uninstall bcrypt

# install the bcrypt modules for the machine
RUN npm install bcrypt
COPY . .

RUN npx prisma generate
RUN npx prisma db pull
RUN npm run build


# EXPOSE 3000/tcp

# CMD [ "node", "dist/main.js" ]
