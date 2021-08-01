import List from "components/List";
import { useEntries } from "resources/entry";
import { useUser } from "resources/user";
import { Header, PageTitle, Footer } from "ui";

export default function Home() {
  const { user } = useUser();
  const { data = [] } = useEntries(user && user.id);
  return (
    <>
      <PageTitle>Good Morning!</PageTitle>
      <Header />
      <List data={data} />
      <Footer />
    </>
  );
}
