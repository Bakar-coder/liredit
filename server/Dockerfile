FROM node:15.14.0-alpine
WORKDIR /usr/app/server
COPY ./package*.json ./yarn.lock ./
COPY . .
RUN yarn install
RUN yarn add argon2
COPY .env .env
RUN yarn build
ENV NODE_ENV production
EXPOSE 8080
USER node
CMD ["yarn", "start"]