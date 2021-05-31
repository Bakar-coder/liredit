import router from "next/router";
import { useContext } from "react";
import { baseContext } from "../context/base/context";
import { isServer } from "../utils/isServer";

export const useAuth = () => {
  const { user } = useContext(baseContext);
  if (!isServer() && !user) {
    router.replace("/auth/login");
  }
};

export const useAdmin = () => {
  const { user } = useContext(baseContext);
  if (!isServer() && !user?.admin) router.replace("/");
};

export const useMerchant = () => {
  const { user } = useContext(baseContext);
  if (!isServer() && (!user?.admin || !user?.seller)) router.replace("/");
};
