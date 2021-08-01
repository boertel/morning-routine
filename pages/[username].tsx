import { useRouter } from "next/router";

import List from "components/List";
import { Header, PageTitle, Footer } from "ui";
import { useEntriesFromUsername } from "resources/entry";

export default function Profile(props) {
  const { query } = useRouter();

  const { data = [] } = useEntriesFromUsername(query.username);
  if (data.length === 0) {
    return null;
  }
  return (
    <>
      <PageTitle>{query.username}</PageTitle>
      <Header />
      <List data={data} canEdit={false} />
      <Footer />
    </>
  );
}
