import { getConnection } from "typeorm";
import { CartItem } from "../entities/CartItem";

export const getCart = async (cartId: number): Promise<CartItem[]> => {
  return await getConnection().manager.find(CartItem, {
    where: { cartId },
    relations: ["product"],
  });
};
