import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";

import { useUser, SignupValues } from "resources/user";
import { PageTitle, Header, Input, Loading } from "ui";

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
        {({ isSubmitting }) => (
          <div className="flex items-center justify-center">
            <Form className="flex-1 space-y-5 mx-4 max-w-lg">
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
              <div className="flex flex-col items-center space-y-1">
                <button
                  className="bg-primary p-2 px-4 rounded-md mt-8 inline-flex items-center justify-center"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting && <Loading />}
                  Sign up
                </button>
              </div>

              <div className="flex flex-col justify-center items-center">
                <Link href="/auth/login">
                  <a>Already have an account?</a>
                </Link>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
