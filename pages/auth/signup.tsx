import { useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";

import { useUser, SignupValues } from "resources/user";
import { Input } from "ui";

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
    console.log(user);
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <div>
            <Input as={Field} placeholder="Username" name="username" type="text" />
          </div>
          <div>
            <Input as={Field} placeholder="Email" name="email" type="email" />
          </div>
          <div>
            <Input as={Field} name="password" placeholder="password" type="password" />
          </div>
          <button type="submit">Sign up</button>
        </Form>
      )}
    </Formik>
  );
}
