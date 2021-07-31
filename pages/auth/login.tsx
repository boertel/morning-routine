import { useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";

import { useUser, LoginValues } from "resources/user";
import { Input } from "ui";

export default function Login() {
  const router = useRouter();
  const { login, user } = useUser();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginValues) => {
    await login(values);
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Input as={Field} name="email" placeholder="email" type="email" />
          <Input as={Field} name="password" placeholder="password" type="password" />
          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
}
