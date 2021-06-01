import { MiddlewareFn } from "type-graphql";
import { ctx } from "../context";

export const isAuth: MiddlewareFn<ctx> = (
  { context },
  next
): Promise<MiddlewareFn<ctx>> => {
  const { res } = context;
  if (!res.locals.isAuth) throw new Error("Unauthenticated");
  return next();
};

export const isMerchant: MiddlewareFn<ctx> = ({ context }, next) => {
  const { res } = context;
  if (!res.locals.user.admin && !res.locals.user.seller)
    throw new Error("Unauthorized. Upgrade to a pro account.");
  return next();
};

export const isAdmin: MiddlewareFn<ctx> = ({ context }, next) => {
  const { res } = context;
  if (!res.locals.user.admin)
    throw new Error("Unauthorized, Admin access only.");
  return next();
};
