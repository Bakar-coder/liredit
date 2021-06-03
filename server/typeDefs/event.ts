import { FileUpload } from "context";
import { GraphQLUpload } from "graphql-upload";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Event } from "../entities/Event";
import { ErrorField } from "./error";

@InputType()
export class EventInputType {
  @Field()
  title: string;

  @Field()
  date: Date;

  @Field()
  venue: string;

  @Field()
  description: string;

  @Field(() => [GraphQLUpload])
  file: FileUpload[];

  @Field(() => Boolean)
  featured: boolean;

  @Field(() => Boolean)
  published: boolean;
}

@InputType()
export class UpdateEventInputType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  date: Date;

  @Field()
  venue: string;

  @Field()
  description: string;

  @Field(() => [GraphQLUpload])
  file: FileUpload[];

  @Field(() => Boolean)
  featured: boolean;

  @Field(() => Boolean)
  published: boolean;
}

@ObjectType()
export class EventResponseType {
  @Field(() => Event, { nullable: true })
  event?: Event;

  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
}
