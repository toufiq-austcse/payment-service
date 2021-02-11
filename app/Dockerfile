FROM mhart/alpine-node:12.16.2

WORKDIR /var/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD ["npm", "start"]
