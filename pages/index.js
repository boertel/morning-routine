import List from "components/List";
import { useEntries } from "resources/entry";
import { useUser } from "resources/user";

export default function Home() {
  const { user } = useUser();
  const { data = [] } = useEntries(user && user.id);
  return <List data={data} />;
}
