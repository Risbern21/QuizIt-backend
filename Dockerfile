FROM node:24-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 300

CMD ["npm","start"]