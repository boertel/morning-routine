import { Container, PageTitle, Link } from "ui";
import Header from "components/Header";
import Footer from "components/Footer";

export default function Home() {
  return (
    <Container>
      <PageTitle>Good Morning!</PageTitle>
      <Header />
      <Link href="/auth/login">Log in</Link>
      <Footer />
    </Container>
  );
}
