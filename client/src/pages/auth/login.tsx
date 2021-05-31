import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Login from "../../components/auth/login";
import { createUrqlClient } from "../../utils/urqlClient";

interface loginTypes {}

const Signin: FC<loginTypes> = ({}) => {
  return <Login />;
};

export default withUrqlClient(createUrqlClient)(Signin);
