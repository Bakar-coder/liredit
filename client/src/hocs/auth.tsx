import { FC, useContext } from "react";
import router from "next/router";
import { baseContext } from "../context/base/context";

export const isAuth = (Component: any) => (props: any) => {
  const { user } = useContext(baseContext);

  return user ? <Component {...props} /> : router.replace("/auth.login");
};

export const isAdmin = (Component: any) => (props: any) => {
  const { user } = useContext(baseContext);
  return user ? <Component {...props} /> : router.replace("/auth.login");
};
