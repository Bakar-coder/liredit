import { ErrorField } from "./error";
import { GraphQLUpload } from "graphql-upload";
import { FileUpload } from "src/context";
import {
  Field,
  Float,
  GraphQLISODateTime,
  InputType,
  Int,
  ObjectType,
} from "type-graphql";
import { Product } from "../entities/Product";

@InputType()
export class CreateProductInputType {
  @Field()
  title: string;

  @Field(() => Int)
  stock: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  discount: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  discountExpiration: Date = new Date();

  @Field()
  description: string;

  @Field()
  category: string;

  @Field(() => [GraphQLUpload])
  images: FileUpload[];

  @Field(() => String, { nullable: true })
  tags: string;

  @Field(() => Boolean, { nullable: true })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}

@InputType()
export class UpdateProductInputType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  category: string;

  @Field(() => Int)
  stock: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  discount: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  discountExpiration: Date = new Date();

  @Field()
  description: string;

  @Field(() => [GraphQLUpload])
  images: FileUpload[];

  @Field(() => String, { nullable: true })
  tags: string;

  @Field(() => Boolean, { nullable: true })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}

@ObjectType()
export class ProductResponseType {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => Product, { nullable: true })
  product?: Product;
}
