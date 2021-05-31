import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/urqlClient";
import Layout from "../components/layout";
import Wrapper from "../components/wrapper";
import { useRouter } from "next/router";

interface ErrorTypes {}

const Error: FC<ErrorTypes> = ({}) => {
  const router = useRouter();
  return (
    <Layout>
      <div className="error__page">
        <Wrapper>
          <div className="content">
            <h1>ERROR 404 PAGE</h1>
            <p>Page you are looking for doesn't exist or has been removed. </p>
            <button className="button" onClick={() => router.push("/")}>
              Back Home
            </button>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Error);
