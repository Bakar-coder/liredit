import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../components/layout";
import { createUrqlClient } from "../../../utils/urqlClient";

const ProductDatials: NextPage = () => {
  const { query } = useRouter();
  return <Layout>{/* <Product title={query.title as string} /> */}</Layout>;
};

export default withUrqlClient(createUrqlClient)(ProductDatials);
