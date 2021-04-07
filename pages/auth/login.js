import { EmailField } from "ui/forms";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

import { login } from "auth";

function LoginForm() {
  return (
    <Form>
      <label>
        <div>E-mail address</div>
        <EmailField name="email" />
      </label>
      <button type="submit">Log in</button>
    </Form>
  );
}

export default function Login() {
  const router = useRouter();
  const initialValues = {
    email: "",
  };

  const handleSubmit = async ({ email }) => {
    const response = await login({ email });
    if (response.ok) {
      router.push("/dashboard");
    }
  };

  return <Formik initialValues={initialValues} component={LoginForm} onSubmit={handleSubmit} />;
}
