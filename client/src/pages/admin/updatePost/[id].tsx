import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { createUrqlClient } from "../../../utils/urqlClient";

interface updateTypes {}

const UpdatePost: FC<updateTypes> = ({}) => {
  return (
    <>
      <h1>Update Post</h1>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(UpdatePost);
