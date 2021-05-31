import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { createUrqlClient } from "../../utils/urqlClient";

interface createProductTypes {}

const CreateProduct: FC<createProductTypes> = ({}) => {
  return (
    <>
      <h1>create product</h1>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(CreateProduct);
