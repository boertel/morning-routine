import { Magic } from "magic-sdk";

export async function login({ email }) {
  const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY).auth.loginWithMagicLink({ email });
  const auth = await fetch("/api/auth/login", {
    method: "POST",
    headers: { Authorization: `Bearer ${did}` },
  });
  return auth;
}
