FROM node:10.11.0-jessie

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
ENV PATH=$HOME/node_modules/.bin/:$PATH

COPY ./.npmrc $HOME/.npmrc
COPY ./package.json $HOME/package.json
COPY ./psc-package.json $HOME/psc-package.json
COPY ./src $HOME/src
COPY ./test $HOME/test

USER app

WORKDIR $HOME

RUN npm install
RUN npm run purs-install || exit 1
RUN npm run purs-build || exit 1
RUN npm run purs-test || exit 1

EXPOSE 80

CMD ["npm", "run", "purs-run"]

