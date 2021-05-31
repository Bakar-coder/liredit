import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon from "argon2";
import gravatar from "gravatar";
import { validateRegister, validatePassword } from "../validation/user";
import {
  UserRegisterInputType,
  LoginUserInputType,
  UserResponseType,
} from "../typeDefs/user";
import { ctx } from "../context";
import { Cart } from "../entities/Cart";
import { User } from "../entities/User";
import { getCart } from "../utils/getCart";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { CORS_ORIGIN, RESET_PASSWORD_PREFIX } from "../_constants";
import sendMail from "../utils/sendMail";

@Resolver()
export class UserResolver {
  @Query(() => UserResponseType, { nullable: true })
  async user(@Ctx() { req }: ctx): Promise<UserResponseType | null> {
    if (!req.session.userId) return null;
    const user = await User.findOne(req.session.userId, {
      relations: ["cart"],
    });
    if (!user) return null;
    user.cart.cartItems = await getCart(user.cart.id);
    return { user };
  }
  @Mutation(() => UserResponseType)
  async register(
    @Arg("opts") opts: UserRegisterInputType,
    @Ctx() { req }: ctx
  ): Promise<UserResponseType> {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      password2,
      seller,
      admin,
    } = opts;
    const { error } = validateRegister(opts);
    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    const ex = validatePassword(password);
    if (error)
      return {
        errors: [{ message: error.details[0].message, field: errorField }],
      };
    if (ex.error)
      return {
        errors: [{ message: ex.error.details[0].message, field: "password" }],
      };
    let user = await User.findOne({ where: { username } });
    if (user)
      return {
        errors: [
          {
            field: "username",
            message: `Username  ${username} is taken.`,
          },
        ],
      };

    if (password !== password2)
      return {
        errors: [
          {
            field: "password2",
            message: `Passwords don't match. try again.`,
          },
        ],
      };

    user = await User.findOne({ where: { email } });

    if (user)
      return {
        errors: [
          {
            field: "email",
            message: `Email address  ${email} is taken.`,
          },
        ],
      };
    const hash = await argon.hash(password);
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    user = await User.create({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      username: username,
      email,
      avatar,
      password: hash,
      seller,
      admin,
      createdAt: new Date(),
    }).save();
    let cart = Cart.create({ user });
    cart = await cart.save();
    req.session!.userId = user.id;
    user.cart = cart;
    return { user };
  }

  @Mutation(() => UserResponseType)
  async login(
    @Arg("opts") opts: LoginUserInputType,
    @Ctx() { req }: ctx
  ): Promise<UserResponseType> {
    const user = await getConnection().manager.findOne(
      User,
      opts.usernameOrEmail.includes("@" && ".")
        ? { email: opts.usernameOrEmail }
        : { username: opts.usernameOrEmail },
      { relations: ["cart"] }
    );
    if (!user)
      return {
        errors: [
          { field: "usernameOrEmail", message: "Invalid username or email." },
        ],
      };
    const ps = await argon.verify(user.password, opts.password);
    if (!ps)
      return { errors: [{ field: "password", message: `Invalid password.` }] };

    const cartItems = await getCart(user.cart.id);
    if (cartItems) user.cart.cartItems = cartItems;
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: ctx): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie("sid");
        return err ? resolve(false) : resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: ctx
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;
    const token = v4();
    await redis.set(
      RESET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 72
    );
    await sendMail(
      CORS_ORIGIN as string,
      email,
      "Password Reset",
      `<a href="${CORS_ORIGIN}/forgot-password/${token}"></a>`
    );
    return true;
  }

  @Mutation(() => Boolean)
  async changePassword(
    @Arg("newPassword") newPassword: string,
    @Arg("token") token: string,
    @Ctx() { redis, req }: ctx
  ): Promise<boolean> {
    const key = RESET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) return false;
    const user = await User.findOne(parseInt(userId));
    if (!user) return false;
    user.password = await argon.hash(newPassword);
    await user.save();
    req.session.userId = user.id;
    return true;
  }
}
