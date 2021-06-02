import { FileUpload } from "context";
import { GraphQLUpload } from "graphql-upload";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Media } from "../entities/Media";
import { ErrorField } from "./error";

@InputType()
export class MediaInputType {
  @Field()
  title: string;

  @Field()
  genre: string;

  @Field()
  type: string;

  @Field()
  releaseDate: Date;

  @Field()
  description: string;

  @Field()
  artist: string;

  @Field()
  category: string;

  @Field(() => [GraphQLUpload])
  file: FileUpload[];

  @Field(() => [GraphQLUpload])
  cover: FileUpload[];

  @Field(() => Boolean)
  featured: boolean;

  @Field(() => Boolean)
  published: boolean;
}

@InputType()
export class UpdateMediaInputType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  genre: string;

  @Field()
  type: string;

  @Field()
  releaseDate: Date;

  @Field()
  description: string;

  @Field()
  artist: string;

  @Field()
  category: string;

  @Field(() => [GraphQLUpload])
  file: FileUpload[];

  @Field(() => [GraphQLUpload])
  cover: FileUpload[];

  @Field(() => Boolean)
  featured: boolean;

  @Field(() => Boolean)
  published: boolean;
}

@ObjectType()
export class MediaResponseType {
  @Field(() => Media, { nullable: true })
  media?: Media;

  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
}
