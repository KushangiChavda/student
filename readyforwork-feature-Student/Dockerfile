FROM node:latest

WORKDIR /src

COPY . ./

RUN npm install --production

EXPOSE 2000

CMD npm run prod

COPY /core /core