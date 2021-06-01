import { ctx } from "../context";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { User } from "../entities/User";
import { UserResponseType } from "../typeDefs/user";
import { getCart } from "../utils/getCart";
import { Arg, Ctx, Mutation, Int, Resolver, Query } from "type-graphql";

import { getConnection } from "typeorm";

@Resolver()
export class CartResolver {
  @Query(() => UserResponseType)
  async getCart(@Ctx() { req }: ctx): Promise<UserResponseType> {
    const user = await getConnection().manager.findOne(
      User,
      req.session.userId
    );
    const cart = await getConnection().manager.findOne(Cart, {
      where: { userId: user?.id },
    });
    const cartItems = cart && (await getCart(cart?.id));
    if (user && cartItems) user.cart.cartItems = cartItems;
    return { user };
  }

  @Mutation(() => UserResponseType)
  async addToCart(
    @Ctx() { req }: ctx,
    @Arg("productId", () => Int!) productId: number,
    @Arg("quantity", () => Int!) quantity: number
  ): Promise<UserResponseType> {
    let newQuantity = quantity ? quantity : 1;
    const user = await getConnection().manager.findOne(
      User,
      req.session.userId,
      { relations: ["cart"] }
    );

    let cart = await getCart(user!.cart.id);
    const [item] = cart.filter(
      (item: CartItem) => item.product.id === productId
    );

    if (!item) {
      const newItem = await CartItem.create({
        cartId: user!.cart.id,
        productId,
        quantity: newQuantity,
      }).save();

      cart = await getCart(newItem.cart.id);
      if (user && cart) user.cart.cartItems = cart;
      return { user };
    }

    const newItem = await CartItem.findOne({
      where: { cartId: user?.cart.id, productId: item.product.id },
    });
    newItem!.quantity = quantity;
    await newItem?.save();
    cart = await getCart(user!.cart.id);
    if (user) user.cart.cartItems = cart;
    return { user };
  }

  @Mutation(() => UserResponseType)
  async decrementCartItem(
    @Ctx() { req }: ctx,
    @Arg("productId", () => Int!) productId: number,
    @Arg("quantity", () => Int!) quantity: number
  ): Promise<UserResponseType> {
    const user = await getConnection().manager.findOne(
      User,
      req.session.userId,
      { relations: ["cart"] }
    );
    const cartId = user!.cart.id;
    let cart = await getCart(cartId);
    const [item] = cart.filter((item) => item.product.id === productId);
    item.quantity = quantity ? quantity : item.quantity - 1;
    await item.save();
    if (user)
      user.cart.cartItems = cart.map((i) =>
        i.product.id === item.product.id ? item : i
      );
    return {
      user,
    };
  }

  @Mutation(() => UserResponseType)
  async removeCartItem(
    @Ctx() { req }: ctx,
    @Arg("productId", () => Int!) productId: number
  ): Promise<UserResponseType> {
    let user = await getConnection().manager.findOne(User, req.session.userId, {
      relations: ["cart"],
    });
    const cartId = user!.cart.id;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where('"cartId" = :cartId', { cartId })
      .andWhere('"productId" = :productId', { productId })
      .execute();
    const cart = await getCart(cartId);
    if (user) user.cart.cartItems = cart;
    return { user };
  }

  @Mutation(() => Boolean)
  async clearCart(@Ctx() { res }: ctx): Promise<boolean> {
    const cartId = res.locals.user.cartId;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where('"cartId" = :cartId', { cartId })
      .execute();

    return true;
  }
}
