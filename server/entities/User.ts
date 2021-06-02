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
import { Photo } from "./Photo";
import { Post } from "./Post";
import { Event } from "./Event";
import { PostReview } from "./PostReview";
import { Product } from "./Product";
import {} from "./Event";
import { ProductReview } from "./ProductReview";
import { Media } from "./Media";
import { Promotion } from "./Promotion";
import { Billing } from "./Billing";

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

  @Field(() => Cart)
  @OneToOne(() => Billing, (c) => c.user)
  billing: Billing;

  @OneToMany(() => ProductReview, (p) => p.user)
  productReviews: ProductReview[];

  @OneToMany(() => PostReview, (p) => p.user)
  postReviews: PostReview[];

  @OneToMany(() => Post, (p) => p.user)
  posts: Post[];

  @OneToMany(() => Product, (p) => p.user)
  products: Product[];

  @OneToMany(() => Photo, (p) => p.user)
  photos: Photo[];

  @OneToMany(() => Event, (e) => e.user)
  events: Event[];

  @OneToMany(() => Media, (m) => m.user)
  media: Media[];

  @OneToMany(() => Promotion, (p) => p.user)
  promotions: Promotion[];
}
