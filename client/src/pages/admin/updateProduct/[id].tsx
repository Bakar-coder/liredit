import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { createUrqlClient } from "../../../utils/urqlClient";

interface updateTypes {}

const UpdateProduct: FC<updateTypes> = ({}) => {
  return (
    <>
      <h1>Update Product</h1>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(UpdateProduct);
