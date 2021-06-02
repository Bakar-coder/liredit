import { MiddlewareFn } from "type-graphql";
import { getConnection } from "typeorm";
import { ctx } from "../context";
import { User } from "../entities/User";

export const isAuth: MiddlewareFn<ctx> = async (
  { context },
  next
): Promise<MiddlewareFn<ctx>> => {
  const { req } = context;
  const user = await getConnection().manager.findOne(User, req.session.userId);
  if (!user) throw new Error("UnAuthenticated request.");
  return next();
};

export const isMerchant: MiddlewareFn<ctx> = async ({ context }, next) => {
  const { req } = context;
  const user = await getConnection().manager.findOne(User, req.session.userId);
  if (!user) throw new Error("UnAuthenticated request.");

  if (!user.admin && !user.seller)
    throw new Error("Unauthorized request. Upgrade to a pro account.");
  return next();
};

export const isAdmin: MiddlewareFn<ctx> = async ({ context }, next) => {
  const { req } = context;
  const user = await getConnection().manager.findOne(User, req.session.userId);
  if (!user?.admin) throw new Error("Unauthorized request. admin access only.");
  return next();
};
