import { useRouter } from "next/router";

import List from "components/List";
import { useEntriesFromUsername } from "resources/entry";

export default function Profile(props) {
  const { query } = useRouter();

  const { data = [] } = useEntriesFromUsername(query.username);
  if (data.length === 0) {
    return null;
  }
  return <List data={data} canEdit={false} />;
}
