FROM node:16.2.0-alpine
WORKDIR /usr/app/server
COPY package.json yarn.lock ./
COPY . .
COPY .env .env
COPY .env.example .env.example
RUN yarn install --frozen-lockfile
RUN yarn add argon2
ENV NODE_ENV production
RUN yarn build
EXPOSE 8080
USER node
CMD ["yarn", "start"]