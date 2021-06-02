FROM node:15.14.0-slim
WORKDIR /usr/app/server
COPY ./package*.json ./yarn.lock ./
COPY . .
COPY .env .env
RUN yarn install
RUN yarn build
ENV NODE_ENV production
EXPOSE 8080
USER node
CMD ["yarn", "start"]