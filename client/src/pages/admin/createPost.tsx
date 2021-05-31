import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { createUrqlClient } from "../../utils/urqlClient";

interface createPostTypes {}

const CreatePost: FC<createPostTypes> = ({}) => {
  return (
    <>
      <h1>create post</h1>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
