FROM node:16.2.0-alpine
WORKDIR /usr/app/server
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
COPY .env .env
ENV NODE_ENV production
RUN yarn build
EXPOSE 8080
USER node
CMD ["yarn", "start"]