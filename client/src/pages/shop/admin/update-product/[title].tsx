import { NextPage } from "next";

import { withUrqlClient } from "next-urql";
import React from "react";
import EditProduct from "../../../../components/admin/editProduct";
import Layout from "../../../../components/layouts";
import { createUrqlClient } from "../../../../utils/urqlClient";
const UpdateProduct: NextPage = () => {
  return (
    <Layout>
      <EditProduct />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(UpdateProduct);
