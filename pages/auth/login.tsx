import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field, Form } from "formik";

import { useUser, LoginValues } from "resources/user";
import { Header, Input } from "ui";

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
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <Header />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div>
              <label>Email Address</label>
              <Input as={Field} name="email" placeholder="email" type="email" />
            </div>
            <div>
              <label>Password</label>
              <Input as={Field} name="password" placeholder="password" type="password" />
            </div>
            <button type="submit">Login</button>
            <Link href="/auth/forgot">
              <a>Forgot password</a>
            </Link>
            <Link href="/auth/signup">
              <a>Create an account</a>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}
