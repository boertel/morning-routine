import Iron from "@hapi/iron";
import prisma from "lib/prisma";
import { serialize } from "cookie";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
const TOKEN_NAME = "api_token";
const MAX_AGE = 60 * 60 * 8;

function createCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    ...options,
  });
}

async function setUserCookie(res, user) {
  const savedUser = await prisma.user.upsert({
    create: {
      email: user.email,
    },
    update: {},
    where: {
      email: user.email,
    },
  });
  user = {
    ...user,
    id: savedUser.id,
  };
  const token = await Iron.seal(user, ENCRYPTION_SECRET, Iron.defaults);
  res.setHeader("Set-Cookie", [createCookie(TOKEN_NAME, token)]);
}

async function getUser(req) {
  const user = await Iron.unseal(req.cookies[TOKEN_NAME], ENCRYPTION_SECRET, Iron.defaults);
  return user;
}

export default { setUserCookie, getUser };
