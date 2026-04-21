FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]