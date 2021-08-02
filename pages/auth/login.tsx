import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field, Form } from "formik";

import { useUser, LoginValues } from "resources/user";
import { Header, Input, PageTitle } from "ui";

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
      <PageTitle>Login</PageTitle>
      <Header className="mb-20" />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="space-y-5 max-w-xl mx-auto">
            <div className="flex flex-col space-y-1">
              <label>Email Address</label>
              <Input as={Field} name="email" placeholder="email" type="email" autoFocus={true} />
            </div>
            <div className="flex flex-col space-y-1">
              <label>Password</label>
              <Input as={Field} name="password" placeholder="password" type="password" />
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-primary py-2 w-full rounded-md mt-8" type="submit">
                Login
              </button>
            </div>

            <div className="flex flex-col justify-center items-center">
              {/*<Link href={{ pathname: "/auth/forgot", state: { email: values.email } }}>
                <a>Forgot password?</a>
                </Link>*/}
              <Link href="/auth/signup">
                <a>Create an account</a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
