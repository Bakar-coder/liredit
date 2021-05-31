import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/urqlClient";
import Register from "../../components/auth/register";

interface loginTypes {}

const Signup: FC<loginTypes> = ({}) => {
  return <Register />;
};

export default withUrqlClient(createUrqlClient)(Signup);
