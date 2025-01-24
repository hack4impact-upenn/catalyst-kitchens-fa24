FROM node:16.20.2

LABEL org.opencontainers.image.source=https://github.com/rosewang01/dockerize-boilerplate
LABEL org.opencontainers.image.description="Boilerplate Server Side Container"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /

COPY ./package.json ./package.json
RUN yarn install 
RUN yarn add --dev typescript@4.9.5

COPY . .

EXPOSE 4000
CMD ["yarn", "server"]