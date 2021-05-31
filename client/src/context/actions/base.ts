import { SET_ERROR, SET_LOADING, SET_PROMO, SET_USER } from "../types";

export const useLoading = (action: any) => {
  const { loading, dispatch } = action;
  dispatch && dispatch({ type: SET_LOADING, payload: loading });
};

export const useError = (action: any) => {
  const { err, dispatch } = action;
  dispatch && dispatch({ type: SET_ERROR, payload: err });
};

export const useUser = (action: any) => {
  const { user, dispatch } = action;
  dispatch && dispatch({ type: SET_USER, payload: user });
};

export const usePromo = (action: any) => {
  const { promo, dispatch } = action;
  dispatch && dispatch({ type: SET_PROMO, payload: promo });
};
