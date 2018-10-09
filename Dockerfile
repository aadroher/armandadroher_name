FROM node:10.11.0-alpine

WORKDIR /app

COPY . /app

RUN npm install purescript

EXPOSE 80

CMD ["node", "-v"]