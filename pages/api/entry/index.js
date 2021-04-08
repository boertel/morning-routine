import prisma from "lib/prisma";
import withUser from "auth/withUser";

export default withUser(async function handler(req, res) {
  const { id, title, src, provider, kind, days, thumbnail, duration } = req.body;
  let entry = {};
  if (req.method === "POST") {
    entry = await prisma.entry.create({
      data: {
        title,
        src,
        provider,
        kind,
        days,
        userId: req.user.id,
        thumbnail: {
          create: {
            src: thumbnail.src,
            width: thumbnail.width,
            height: thumbnail.height,
          },
        },
      },
      include: {
        thumbnail: true,
      },
    });
  } else if (req.method === "GET") {
    const entries = await prisma.entry.findMany({
      where: {
        user: { id: req.user.id },
      },
      include: {
        thumbnail: true,
      },
    });
    entries.forEach((item) => {
      entry[item.id] = item;
    });
  }
  res.send(entry);
});
