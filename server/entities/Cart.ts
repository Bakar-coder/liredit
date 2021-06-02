import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @PrimaryColumn({ type: "bigint" })
  userId: number;

  @OneToOne(() => User, (user) => user.cart, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Field(() => [CartItem], { nullable: true })
  @OneToMany(() => CartItem, (item) => item.cart)
  cartItems: CartItem[];
}
