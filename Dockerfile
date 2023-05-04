FROM node:18-alpine


COPY package*.json ./

WORKDIR /app

RUN npm install

COPY . .

EXPOSE 3000

 
CMD ["npm","start"]