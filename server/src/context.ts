import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Stream } from "stream";

export interface ctx {
  req: Request & {
    // @ts-ignore
    session: Express.Session;
  };
  res: Response;
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  redis: Redis;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
