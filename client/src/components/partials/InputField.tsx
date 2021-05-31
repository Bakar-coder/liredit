import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { FC, InputHTMLAttributes } from "react";

type InputFieldTypes = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

const InputField: FC<InputFieldTypes> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input
        {...field}
        id={props.id}
        placeholder={props.placeholder}
        type={
          props.type === "password"
            ? "password"
            : props.type === "file"
            ? "file"
            : props.type === "email"
            ? "email"
            : "text"
        }
      />
      {(field.name === "description" || field.name === "details") && (
        <Textarea {...field} id={props.id} placeholder={props.placeholder} />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
