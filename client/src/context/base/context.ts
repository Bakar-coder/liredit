import { createContext } from "react";
import { base } from "../types/base";
import { preloadedState } from "./state";
export const baseContext = createContext<base>(preloadedState);
