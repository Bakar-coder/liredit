import { Dispatch } from "react";
import { User } from "../../generated/graphql";

export interface base {
  loading: boolean;
  setLoading: any;
  user: User | null;
  setUser: any;
  error: string | null;
  setError: any;
  promo: any;
  setPromo: any;
  dispatch?: Dispatch<any>;
}
