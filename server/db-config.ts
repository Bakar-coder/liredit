import { createConnection } from "typeorm";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USER,
  __prod__,
} from "./_constants";

export const dbConfig = {
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  type: DB_TYPE,
  username: DB_USER,
  synchronize: !__prod__,
  logging: !__prod__,
  entities: ["./entities/*.ts"],
  migrations: ["./migrations/*.ts"],
  subscribers: ["./subscribers/*.ts"],
} as Parameters<typeof createConnection>[0];
