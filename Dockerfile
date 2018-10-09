FROM node:10.11.0-jessie

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY ./package.json $HOME/package.json
COPY ./src $HOME/src

USER app

WORKDIR $HOME

RUN npm install

EXPOSE 80

CMD ["npm", "test"]