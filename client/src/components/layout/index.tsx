import { useToast } from "@chakra-ui/core";
import React, { FC, useContext } from "react";
import { baseContext } from "../../context/base/context";
import { useUserQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import Preloader from "../partials/preloader";
import Header from "./header";

interface indexTypes {}

const Layout: FC<indexTypes> = ({ children }) => {
  const { loading, setLoading, user, setUser } = useContext(baseContext);
  const [{ data }] = useUserQuery({ pause: isServer() });
  const toast = useToast();
  const { error, setError } = useContext(baseContext);

  if (!isServer()) {
    if (loading) setTimeout(() => setLoading(false), 2000);
    if (setError) setTimeout(() => setError(false), 3000);
    if (!user && data?.user?.user) setUser(data?.user?.user);
  }

  return loading ? (
    <Preloader />
  ) : (
    <>
      <Header />
      {error &&
        toast({
          title: "ERROR MESSAGE",
          description: error,
          status: "error",
          position: "bottom-right",
        })}
      {children}
    </>
  );
};

export default Layout;
