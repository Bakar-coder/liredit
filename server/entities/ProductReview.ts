import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@ObjectType()
@Entity()
export class ProductReview extends BaseEntity {
  @PrimaryColumn({ type: "bigint" })
  userId: number;

  @PrimaryColumn({ type: "bigint" })
  productId: number;

  @Field()
  @Column({ type: "float" })
  rating: number;

  @Field()
  @Column({ type: "text" })
  message: string;

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.productReviews, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (p) => p.reviews, { onDelete: "CASCADE" })
  @JoinColumn()
  product: Product;
}
