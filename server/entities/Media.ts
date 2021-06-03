import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@ObjectType()
@Entity()
export class Media extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  genre: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  releaseDate: Date;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  artist: string;

  @PrimaryColumn()
  categoryId: number;

  @Field()
  @Column({ type: "text" })
  file: string;

  @Field()
  @Column({ type: "text" })
  cover: string;

  @Field(() => Boolean)
  @Column({ default: false })
  featured: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  published: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.media, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Field(() => Category)
  @ManyToOne(() => Category, (cat) => cat.media, { onDelete: "CASCADE" })
  @JoinColumn()
  category: Category;
}
