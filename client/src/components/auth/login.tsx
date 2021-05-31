import React, { FC, useContext } from "react";
import { Form, Formik } from "formik";
import { Box, Button, useToast } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useLoginMutation } from "../../generated/graphql";
import Layout from "../layout";
import Wrapper from "../wrapper";
import InputField from "../partials/InputField";
import { errorMap } from "../../utils/errorMap";
import { baseContext } from "../../context/base/context";

interface loginTypes {}

const Login: FC<loginTypes> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  const toast = useToast();
  const { user } = useContext(baseContext);
  if (user) router.replace("/");

  return (
    <Layout>
      <Wrapper varient="medium">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await login(values);
            if (data?.login.user) {
              toast({
                title: "LOGIN MESSAGE",
                description: `welcome back ${data.login.user.firstName} ${data.login.user.lastName}.`,
                status: "success",
                position: "bottom-right",
              });
              router.replace("/");
            }
            if (data?.login.errors) {
              setErrors(errorMap(data.login.errors));
            }
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className="form">
              <Box mb={8}>
                <h1>Sign In</h1>
                <p>Welcome back! login to continue.</p>
              </Box>
              <Box>
                <InputField
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  label="Username Or Email"
                  placeholder="enter username or email address."
                  value={values.usernameOrEmail}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Box mt={4}>
                <InputField
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="enter password."
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Button mt={4} type="submit" isLoading={isSubmitting}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default Login;
