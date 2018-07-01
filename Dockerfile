FROM node:carbon

LABEL maintainer="renato.oda2@gmail.com"

RUN mkdir -p /usr/src/app

ENV HOME=/usr/src/app

COPY package.json yarn.lock $HOME/

# Default dir
WORKDIR $HOME/

# Install pm2
RUN npm install -g pm2 --silent --progress=false

# Install app dependencies
RUN yarn install --frozen-lockfile --production

# Bundle app source
COPY . $HOME/

EXPOSE 3000
CMD ["yarn", "run", "start"]
