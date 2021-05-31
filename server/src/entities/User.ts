import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Post } from "./Post";
import { PostReview } from "./PostReview";
import { Product } from "./Product";
import { ProductReview } from "./ProductReview";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  @Unique(["username"])
  username: string;

  @Field()
  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  avatar: string;

  @Field(() => Boolean)
  @Column({ default: false })
  admin: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  seller: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Cart)
  @OneToOne(() => Cart, (c) => c.user)
  cart: Cart;

  @OneToMany(() => ProductReview, (item) => item.user)
  productReviews: ProductReview[];

  @OneToMany(() => PostReview, (item) => item.user)
  postReviews: PostReview[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Product, (prod) => prod.user)
  products: Product[];
}
