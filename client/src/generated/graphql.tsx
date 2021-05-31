import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Cart = {
  __typename?: 'Cart';
  cartItems?: Maybe<Array<CartItem>>;
};

export type CartItem = {
  __typename?: 'CartItem';
  quantity: Scalars['Int'];
  product: Product;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateProductInputType = {
  title: Scalars['String'];
  stock: Scalars['Int'];
  price: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
  discountExpiration?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  category: Scalars['String'];
  images: Array<Scalars['Upload']>;
  tags?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
};


export type ErrorField = {
  __typename?: 'ErrorField';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type LoginUserInputType = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponseType;
  login: UserResponseType;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  createPost: PostResponseType;
  updateProduct: ProductResponseType;
  deletePost: PostResponseType;
  createProduct: ProductResponseType;
  deleteProduct: ProductResponseType;
};


export type MutationRegisterArgs = {
  opts: UserRegisterInputType;
};


export type MutationLoginArgs = {
  opts: LoginUserInputType;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreatePostArgs = {
  opts: PostInputType;
};


export type MutationUpdateProductArgs = {
  opts: UpdateProductInputType;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProductArgs = {
  opts: CreateProductInputType;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PostInputType = {
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
  tags?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
};

export type PostResponseType = {
  __typename?: 'PostResponseType';
  post?: Maybe<Post>;
  errors?: Maybe<Array<ErrorField>>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  title: Scalars['String'];
  stock: Scalars['Int'];
  price: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
  discountExpiration?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  images?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  reviews?: Maybe<Array<ProductReview>>;
  category: Category;
};

export type ProductResponseType = {
  __typename?: 'ProductResponseType';
  errors?: Maybe<Array<ErrorField>>;
  product?: Maybe<Product>;
};

export type ProductReview = {
  __typename?: 'ProductReview';
  rating: Scalars['Float'];
  message: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<UserResponseType>;
  post: Scalars['String'];
};

export type UpdateProductInputType = {
  id: Scalars['Int'];
  title: Scalars['String'];
  category: Scalars['String'];
  stock: Scalars['Int'];
  price: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
  discountExpiration?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  images: Array<Scalars['Upload']>;
  tags?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  admin: Scalars['Boolean'];
  seller: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  cart: Cart;
};

export type UserRegisterInputType = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
  seller?: Maybe<Scalars['Boolean']>;
  admin?: Maybe<Scalars['Boolean']>;
};

export type UserResponseType = {
  __typename?: 'UserResponseType';
  user?: Maybe<User>;
  errors?: Maybe<Array<ErrorField>>;
};

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'avatar' | 'admin' | 'seller' | 'createdAt' | 'updatedAt'>
  & { cart: (
    { __typename?: 'Cart' }
    & { cartItems?: Maybe<Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, 'quantity'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'title' | 'price' | 'discount' | 'description' | 'images'>
      ) }
    )>> }
  ) }
);

export type ErrorFragment = (
  { __typename?: 'ErrorField' }
  & Pick<ErrorField, 'field' | 'message'>
);

export type UserDataFragment = (
  { __typename?: 'UserResponseType' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'ErrorField' }
    & ErrorFragment
  )>> }
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
  admin?: Maybe<Scalars['Boolean']>;
  seller?: Maybe<Scalars['Boolean']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponseType' }
    & UserDataFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponseType' }
    & UserDataFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserResponseType' }
    & UserDataFragment
  )> }
);

export const UserFragmentDoc = gql`
    fragment user on User {
  id
  firstName
  lastName
  username
  email
  avatar
  admin
  seller
  createdAt
  updatedAt
  cart {
    cartItems {
      quantity
      product {
        id
        title
        price
        discount
        description
        images
      }
    }
  }
}
    `;
export const ErrorFragmentDoc = gql`
    fragment error on ErrorField {
  field
  message
}
    `;
export const UserDataFragmentDoc = gql`
    fragment userData on UserResponseType {
  user {
    ...user
  }
  errors {
    ...error
  }
}
    ${UserFragmentDoc}
${ErrorFragmentDoc}`;
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!, $password2: String!, $admin: Boolean, $seller: Boolean) {
  register(
    opts: {firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password, password2: $password2, admin: $admin, seller: $seller}
  ) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(opts: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword)
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const UserDocument = gql`
    query User {
  user {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};