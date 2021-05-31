import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../../components/layout";
import { createUrqlClient } from "../../utils/urqlClient";

interface indexTypes {}

const Shop: FC<indexTypes> = ({}) => {
  return (
    <Layout>
      <h1>shop</h1>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Shop);
