import React from "react";
import AppState from "./base";

interface propTypes {}

const AppContext: React.FC<propTypes> = ({ children }) => {
  return <AppState>{children}</AppState>;
};

export default AppContext;
