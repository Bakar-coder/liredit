import { Box } from "@chakra-ui/core";
import React, { FC } from "react";

interface wrapperTypes {
  varient?: "small" | "medium" | "regular";
}

const Wrapper: FC<wrapperTypes> = ({ children, varient = "regular" }) => {
  return (
    <Box
      maxW={
        varient === "regular"
          ? "100%"
          : varient === "medium"
          ? "768px"
          : "400px"
      }
      w="100%"
      px={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
