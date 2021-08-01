import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUser } from "resources/user";

export default function Logout() {
  const { signout } = useUser();
  const router = useRouter();

  useEffect(() => {
    signout();
    router.push("/auth/login");
  }, []);

  return null;
}
