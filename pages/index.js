import { useState, useEffect } from "react";
import List from "components/List";
import { fetchEntries } from "resources/entry";

export default function Home() {
  const [entries, setEntries] = useState([]);
  useEffect(async () => {
    setEntries(await fetchEntries());
  }, []);
  return <List data={entries} />;
}
