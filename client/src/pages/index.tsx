import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Home from "../components";

import { createUrqlClient } from "../utils/urqlClient";

interface indexTypes {}

const index: FC<indexTypes> = ({}) => {
  return <Home />;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(index);
