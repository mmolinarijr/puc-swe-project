FROM node:16.18.0 AS base
WORKDIR /src
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "run", "build"]