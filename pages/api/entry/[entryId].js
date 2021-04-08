import prisma from "lib/prisma";
import withUser from "auth/withUser";

export default withUser(async function handler(req, res) {
  const { entryId } = req.query;
  const { title, src, provider, kind, days, thumbnail, duration } = req.body;
  let entry = {};
  if (req.method === "PUT") {
    entry = await prisma.entry.update({
      data: {
        title,
        duration,
        src,
        provider,
        kind,
        days,
      },
      where: {
        id: entryId,
      },
    });
  } else if (req.method === "DELETE") {
    entry = await prisma.entry.delete({
      where: {
        id: entryId,
      },
    });
  }
  res.send(entry);
});
