import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
  @PrimaryColumn()
  cartId: number;

  @PrimaryColumn()
  productId: number;

  @Field(() => Int)
  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: "CASCADE" })
  @JoinColumn()
  cart: Cart;

  @Field(() => Product)
  @ManyToOne(() => Product, (prod) => prod.cartItems, { onDelete: "CASCADE" })
  @JoinColumn()
  product: Product;
}
