import { Magic } from "@magic-sdk/admin";
import CookieService from "auth/cookie";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  // exchange the did from Magic for some user data
  const did = req.headers.authorization.split("Bearer").pop().trim();
  const user = await new Magic(process.env.MAGIC_SECRET_KEY).users.getMetadataByToken(did);

  await CookieService.setUserCookie(res, user);

  res.end();
};
