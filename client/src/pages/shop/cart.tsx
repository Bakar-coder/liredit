import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../../components/layout";
import Cart from "../../components/shop/cart";
import { createUrqlClient } from "../../utils/urqlClient";

interface cartTypes {}

const CartPage: FC<cartTypes> = ({}) => {
  return (
    <Layout>
      <Cart />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CartPage);
