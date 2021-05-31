import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { createUrqlClient } from "../../utils/urqlClient";

interface dashboardTypes {}

const Dashboard: FC<dashboardTypes> = ({}) => {
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Dashboard);
