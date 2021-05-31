FROM node:15.14.0-alpine
WORKDIR /usr/app/server
COPY package.json ./
COPY . .
RUN yarn install
COPY .env .env
ENV NODE_ENV production
RUN yarn build
EXPOSE 8080
USER node
CMD ["yarn", "start"]