import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Stream } from "stream";

export interface ctx {
  req: Request & {
    // @ts-ignore
    session: Express.Session;
  };
  res: Response;
  redis: Redis;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
