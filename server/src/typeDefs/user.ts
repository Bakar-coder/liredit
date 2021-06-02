import { ObjectType, Field, InputType } from "type-graphql";
import { ErrorField } from "./error";
import { User } from "../entities/User";

@InputType()
export class UserRegisterInputType {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  password2: string;

  @Field(() => Boolean, { nullable: true })
  seller: boolean;

  @Field(() => Boolean, { nullable: true })
  admin: boolean;
}

@InputType()
export class LoginUserInputType {
  @Field()
  usernameOrEmail: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserResponseType {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
}
