import "reflect-metadata";
import express, { NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { graphqlUploadExpress } from "graphql-upload";
import cors from "cors";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { resolve } from "path";
import session from "express-session";
import helmet from "helmet";
import compression from "compression";
import { createConnection } from "typeorm";
import { mkdir, readdir } from "fs";
import {
  CORS_ORIGIN,
  DB_HOST,
  DB_TYPE,
  PORT,
  PRIVATE_KEY,
  __prod__,
} from "./_constants";
import { dbConfig } from "./db-config";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import { userLoader } from "./utils/userLoader";
import { ctx } from "./context";
import { User } from "./entities/User";
import { logger } from "./utils/logger";
import { filePaths } from "./utils/paths";
import { ProductResolver } from "./resolvers/product";
import { CartResolver } from "./resolvers/cart";

filePaths.map((filePath) =>
  readdir(
    filePath,
    (_, path) =>
      path === undefined &&
      mkdir(`${filePath}`, { recursive: true }, (err) => {
        if (err) logger.error(err.message, err);
      })
  )
);

const server = async () => {
  const app = express();
  const redis = new Redis({
    port: 6379, // Redis port
    host: DB_HOST, // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    connectTimeout: 10000,
    db: 0,
  });
  const redisStore = connectRedis(session);
  const conn = await createConnection({
    ...dbConfig,
    entities: ["build/entities/*.js"],
    migrations: ["build/migrations/*.js"],
  });

  app
    .disable("x-powered-by")
    .set("trust proxy", 1)
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/static", express.static(resolve("static")))
    .use(cors({ credentials: true, origin: CORS_ORIGIN }))
    .use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }))
    .use(
      session({
        name: "sid",
        secret: PRIVATE_KEY as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
          sameSite: "lax",
          httpOnly: __prod__,
          maxAge: 1000 * 60 * 60 * 24 * 3,
          secure: __prod__,
        },
        store: new redisStore({ client: redis, disableTouch: true }),
      })
    )
    .use(async (req: ctx["req"], _: any, next: NextFunction) => {
      if (!req.session.userId) return next();
      const user = await User.findOne(req.session.userId, {
        relations: ["cart"],
      });
      req.user = user;
      return next();
    })
    .use((req, res, next) => {
      if (req.user) {
        res.locals.user = req.user;
        res.locals.isAuth = true;
        res.locals.userLoader = userLoader();
      }
      next();
    })
    .use(helmet())
    .use(compression());

  const apollo = new ApolloServer({
    uploads: false,
    context: ({ req, res }) => ({ req, res }),
    schema: await buildSchema({
      validate: false,
      resolvers: [CartResolver, PostResolver, ProductResolver, UserResolver],
    }),
  });
  apollo.applyMiddleware({ app, cors: false });
  conn &&
    app.listen(PORT, () => {
      conn && conn.runMigrations();
      console.log(
        "```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````"
      );
      conn && logger.info(`Connected to ${DB_TYPE} database;`);
      logger.info(`server running on http://127.0.0.1:${PORT}`);
    });
};
process.on("uncaughtException", (ex) => logger.error(ex.message, ex));
process.on("unhandledRejection", (ex) => logger.error(ex));
server().catch((err) => logger.error(err, err.message));
