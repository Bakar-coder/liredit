import { Spinner } from "@chakra-ui/core";
import React, { FC } from "react";

interface preloaderTypes {}

const Preloader: FC<preloaderTypes> = ({}) => {
  return (
    <>
      <div className="preloader">
        <Spinner />
      </div>
    </>
  );
};

export default Preloader;
