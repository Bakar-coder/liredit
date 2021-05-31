import router from "next/router";
import { dedupExchange, Exchange } from "urql";
import { pipe, tap } from "wonka";
import { cacheExchange } from "@urql/exchange-graphcache";
import { multipartFetchExchange as fetchExchange } from "@urql/exchange-multipart-fetch";
import { API_URL } from "../../_constant";
import {
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
  UserDocument,
  UserQuery,
} from "../generated/graphql";
import { betterUpdateQry } from "./updateQry";

const errorExchange: Exchange = ({ forward }) => (ops$) =>
  pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        error.message.includes("not authenticated") &&
          router.replace("/users/auth/login");
        error.message.includes("not authorized") && router.replace("/");
      }
    })
  );

export const createUrqlClient = (ssrExchange: any) => ({
  url: API_URL as string,
  fetchOptions: { credentials: `include` as const },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        UserType: () => null,
      },
      updates: {
        Mutation: {
          register: (result, _, cache) => {
            betterUpdateQry<RegisterMutation, UserQuery>(
              cache,
              { query: UserDocument },
              result,
              ({ register }, query) =>
                register.errors ? query : { user: register }
            );
          },
          login: (result, args, cache) => {
            betterUpdateQry<LoginMutation, UserQuery>(
              cache,
              { query: UserDocument },
              result,
              ({ login }, query) =>
                login.errors
                  ? query
                  : {
                      id: args.id,
                      user: login,
                    }
            );
          },
          logout: (result, args, cache) => {
            betterUpdateQry<LogoutMutation, UserQuery>(
              cache,
              { query: UserDocument },
              result,
              () => ({
                id: args.id,
                user: null,
              })
            );
          },
        },
      },
    }),
    errorExchange,
    fetchExchange,
    ssrExchange,
  ],
});
