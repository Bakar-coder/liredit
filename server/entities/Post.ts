import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";
import { PostReview } from "./PostReview";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", default: null, nullable: true })
  image: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  tags: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: true })
  published: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (u) => u.posts, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => PostReview, (item) => item.post)
  reviews: PostReview[];
}
