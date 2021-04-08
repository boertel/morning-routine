import withUser from "auth/withUser";
import prisma from "lib/prisma";
import List from "components/List";
import { useEntries } from "resources";
import { cache } from "swr";

export const getServerSideProps = withUser(async ({ req }) => {
  const entries = await prisma.entry.findMany({
    where: {
      user: { id: req.user.id },
    },
    include: {
      thumbnail: true,
    },
  });

  const pivot = {};
  entries.forEach((entry) => {
    pivot[entry.id] = entry;
  });

  return {
    props: {
      entries: pivot,
    },
  };
});

export default function Mine({ entries: initialData }) {
  const { data: entries } = useEntries({ initialData });
  // WHAT?!
  cache.get("/api/entry");
  return <List data={entries} />;
}
