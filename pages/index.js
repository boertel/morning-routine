import List from "components/List";
import { useItems } from "resources";

export default function Home() {
  const { data } = useItems();
  return <List data={data} />;
}
