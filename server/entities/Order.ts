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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

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
  shippingAddr: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  shippingAddr2: string;

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

  @Field()
  @Column({ type: "text" })
  items: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", default: null, nullable: true })
  notes: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: "float", default: 0, nullable: true })
  shippingAmount: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: "float", default: 0, nullable: true })
  taxAmount: number;

  @Field()
  @Column({ type: "float", default: 0 })
  totalAmount: number;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;
}
