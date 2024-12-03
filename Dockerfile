FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 1234

CMD ["npm", "start", "--", "--port", "1234"]
