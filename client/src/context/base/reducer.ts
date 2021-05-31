import { SET_ERROR, SET_LOADING, SET_PROMO, SET_USER } from "../types";
import { base } from "../types/base";

export const BaseReducer = (state: base, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_USER:
      return { ...state, user: payload };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_PROMO:
      return { ...state, promo: payload };

    default:
      return state;
  }
};
