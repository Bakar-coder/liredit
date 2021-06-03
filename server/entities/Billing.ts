import { User } from "../entities/User";
import { Field, Int, ObjectType, GraphQLISODateTime } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Billing extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @PrimaryColumn({ type: "bigint" })
  userId: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  company: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  addr: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  addr2: string;

  @Field()
  @Column()
  city: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  state: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  zipCode: number;

  @Field()
  @Column()
  phone: number;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", default: null, nullable: true })
  notes: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.billing, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
