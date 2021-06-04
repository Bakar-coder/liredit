import { NextPage } from "next";
import Router from "next/router";
import { withUrqlClient } from "next-urql";
import React from "react";
import EditProduct from "../../../../components/admin/editProduct";
import Layout from "../../../../components/layouts";
import { createUrqlClient } from "../../../../utils/urqlClient";
const UpdateProduct: NextPage = () => {
  const title = Router.query.title as string;
  return (
    <Layout>
      <EditProduct productTitle={title} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(UpdateProduct);
