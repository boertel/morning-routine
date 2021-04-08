import { EmailField } from "ui/forms";
import { Container } from "ui";
import Footer from "components/Footer";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

import { login } from "auth";

function LoginForm() {
  return (
    <Container>
      <Form className="flex flex-col items-start">
        <label>
          <div>E-mail address</div>
          <EmailField name="email" />
        </label>
        <button type="submit" className="rounded p-2 border-gray-100 border">
          Log in
        </button>
      </Form>
      <Footer />
    </Container>
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
      router.push("/mine");
    }
  };

  return <Formik initialValues={initialValues} component={LoginForm} onSubmit={handleSubmit} />;
}
