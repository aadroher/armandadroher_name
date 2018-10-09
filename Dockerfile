FROM node:10.11.0-jessie

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
ENV PATH=$HOME/node_modules/.bin/:$PATH

COPY ./package.json $HOME/package.json
COPY ./.npmrc $HOME/.npmrc
COPY ./src $HOME/src

USER app

WORKDIR $HOME

RUN npm install purescript@0.12.0 pulp psc-package-bin-simple 

# RUN alias p=pulp --psc-package

RUN pulp --psc-package init

EXPOSE 80

CMD ["pulp --psc-package", "run"]

