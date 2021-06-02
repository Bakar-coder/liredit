import { ProductReview } from "./ProductReview";

import {
  Field,
  Int,
  ObjectType,
  GraphQLISODateTime,
  Float,
} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CartItem } from "./CartItem";
import { User } from "./User";
import { Category } from "./Category";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @PrimaryColumn()
  categoryId: number;

  @PrimaryColumn()
  userId: number;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column({ type: "int" })
  stock: number;

  @Field(() => Float)
  @Column({ type: "float" })
  price: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: "float", nullable: true, default: null })
  discount: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: "date", nullable: true, default: null })
  discountExpiration: Date = new Date();

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", default: null, nullable: true })
  images: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  tags: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: true })
  published: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.products, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (item) => item.product)
  cartItems: CartItem[];

  @Field(() => [ProductReview], { nullable: true })
  @OneToMany(() => ProductReview, (item) => item.product)
  reviews: ProductReview[];

  @Field(() => Category)
  @ManyToOne(() => Category, (cat) => cat.products, { onDelete: "CASCADE" })
  @JoinColumn()
  category: Category;
}
