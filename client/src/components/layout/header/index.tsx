import React, { FC } from "react";
import HeaderMiddle from "./middle";
import Nav from "./nav";
import HeaderTop from "./top";

interface indexTypes {}

const index: FC<indexTypes> = ({}) => {
  return (
    <>
      <HeaderTop />
      <HeaderMiddle />
      <Nav />
    </>
  );
};

export default index;
