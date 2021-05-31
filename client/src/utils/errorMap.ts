import { ErrorField } from "../generated/graphql";

export const errorMap = (errors: ErrorField[]) => {
  const error: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    error[field as string] = message;
  });

  return error;
};
