FROM node:8

ENV USER=microdsc
ENV SUBDIR=greetsink

RUN useradd --user-group --create-home --shell /bin/false $USER &&\
	npm install --global tsc-watch npm ntypescript typescript

ENV HOME=/home/$USER

COPY package.json $HOME/$SUBDIR/
COPY src $HOME/$SUBDIR/src
RUN chown -R $USER:$USER $HOME/*
USER $USER
WORKDIR $HOME/$SUBDIR

RUN npm install
CMD ["node", "dist/index.js"]
