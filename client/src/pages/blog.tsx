import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../components/layout";
import { createUrqlClient } from "../utils/urqlClient";

interface blogTypes {}

const Blog: FC<blogTypes> = ({}) => {
  return (
    <Layout>
      <h1>Blog</h1>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Blog);
