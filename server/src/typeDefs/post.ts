import { GraphQLUpload } from "graphql-upload";
import { FileUpload } from "src/context";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Post } from "../entities/Post";
import { ErrorField } from "./error";

@InputType()
export class PostInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;

  @Field(() => String, { nullable: true })
  tags?: string;

  @Field(() => Boolean, { nullable: true })
  featured?: boolean;

  @Field(() => Boolean, { nullable: true })
  published?: boolean;
}

@InputType()
export class UpdatePostInputType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;

  @Field(() => String, { nullable: true })
  tags?: string;

  @Field(() => Boolean, { nullable: true })
  featured?: boolean;

  @Field(() => Boolean, { nullable: true })
  published?: boolean;
}

@ObjectType()
export class PostResponseType {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
}
