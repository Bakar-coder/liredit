import { User } from "../entities/User";
import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Promotion extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  expDate: Date;

  @Field()
  @Column()
  file: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Boolean)
  @Column({ default: false })
  featured: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  published: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.promotions, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
