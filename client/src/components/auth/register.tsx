import React, { FC, useContext } from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../../generated/graphql";
import Layout from "../layout";
import Wrapper from "../wrapper";
import InputField from "../partials/InputField";
import { errorMap } from "../../utils/errorMap";
import { baseContext } from "../../context/base/context";

interface registerTypes {}

const Register: FC<registerTypes> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  const { user } = useContext(baseContext);
  if (user) router.replace("/");

  return (
    <Layout>
      <Wrapper varient="medium">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            password2: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await register(values);
            return data?.register.errors
              ? setErrors(errorMap(data.register.errors))
              : data?.register.user
              ? router.replace("/")
              : null;
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className="form">
              <Box mb={8}>
                <h1>Sign Up</h1>
                <p>Hallo! create account.</p>
              </Box>

              <Box>
                <InputField
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  placeholder="enter first name ."
                  value={values.firstName}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Box mt={4}>
                <InputField
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  placeholder="enter last name ."
                  value={values.lastName}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Box mt={4}>
                <InputField
                  name="username"
                  id="username"
                  label="Username"
                  placeholder="enter username ."
                  value={values.username}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Box mt={4}>
                <InputField
                  name="email"
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="enter email address ."
                  value={values.email}
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

              <Box mt={4}>
                <InputField
                  name="password2"
                  id="password2"
                  type="password"
                  label="Confirm Password"
                  placeholder="confirm password."
                  value={values.password2}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Button mt={4} type="submit" isLoading={isSubmitting}>
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default Register;
