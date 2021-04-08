import CookieService from "lib/cookie";

export function getServerSideProps({ res }) {
  CookieService.setTokenCookie(res, null);
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
}

export default function Logout() {
  return null;
}
