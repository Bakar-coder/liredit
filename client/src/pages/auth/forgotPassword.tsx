import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { createUrqlClient } from "../../utils/urqlClient";

interface forgotPasswordTypes {}

const ForgotPassword: FC<forgotPasswordTypes> = ({}) => {
  return (
    <>
      <h1>forgot password</h1>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
