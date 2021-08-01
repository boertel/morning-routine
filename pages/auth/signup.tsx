import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";

import { useUser, SignupValues } from "resources/user";
import { PageTitle, Header, Input } from "ui";

export default function Signup() {
  const router = useRouter();
  const { user, signup } = useUser();

  const initialValues: SignupValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: SignupValues) => {
    await signup(values);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <PageTitle>Sign-up</PageTitle>
      <Header className="mb-20" />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form className="space-y-5 max-w-sm mx-auto">
            <div className="flex flex-col space-y-1">
              <label>Username</label>
              <Input as={Field} placeholder="Username" name="username" type="text" />
            </div>
            <div className="flex flex-col space-y-1">
              <label>Email Address</label>
              <Input as={Field} placeholder="Email" name="email" type="email" />
            </div>
            <div className="flex flex-col space-y-1">
              <label>Password</label>
              <Input as={Field} name="password" placeholder="password" type="password" />
            </div>
            <div className="flex flex-col space-y-1">
              <button className="bg-primary py-2 w-full rounded-md mt-8" type="submit">
                Sign up
              </button>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Link href="/auth/login">
                <a>Already have an account?</a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
