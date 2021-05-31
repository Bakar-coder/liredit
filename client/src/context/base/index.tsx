import React, { useReducer } from "react";
import { User } from "../../generated/graphql";
import { useError, useLoading, usePromo, useUser } from "../actions/base";
import { baseContext } from "./context";
import { BaseReducer } from "./reducer";
import { preloadedState } from "./state";
interface propTypes {}

const AuthState: React.FC<propTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(BaseReducer, preloadedState);
  const { Provider } = baseContext;

  const setLoading = (loading: Boolean) => useLoading({ loading, dispatch });
  const setError = (err: string) => useError({ err, dispatch });
  const setUser = (user: User) => useUser({ user, dispatch });
  const setPromo = (promo: any) => usePromo({ promo, dispatch });

  return (
    <Provider value={{ ...state, setLoading, setUser, setError, setPromo }}>
      {children}
    </Provider>
  );
};

export default AuthState;
