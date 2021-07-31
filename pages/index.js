import { useState, useEffect } from "react";
import List from "components/List";
import { fetchEntries } from "resources/entry";
import { useUser } from "resources/user";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const { user } = useUser();
  useEffect(async () => {
    if (user) {
      setEntries(await fetchEntries({ profile_id: user.id }));
    }
  }, [user]);
  return <List data={entries} />;
}
