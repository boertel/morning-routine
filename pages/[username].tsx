import { useRouter } from "next/router";

import List from "components/List";
import { Header, PageTitle, Footer, Loading } from "ui";
import { useEntriesFromUsername } from "resources/entry";

export default function Profile(props) {
  const { query } = useRouter();

  const { data = [], isValidating } = useEntriesFromUsername(query.username);
  return (
    <>
      <PageTitle>{query.username}</PageTitle>
      <Header />
      {isValidating && data.length !== 0 ? (
        <div className="w-full flex justify-center px-3 py-10 flex-1">
          <Loading />
        </div>
      ) : (
        <List data={data} canEdit={false} />
      )}
      <Footer />
    </>
  );
}
