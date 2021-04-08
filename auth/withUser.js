import Iron from "@hapi/iron";
import qs from "qs";
import http from "http";

import CookieService from "./cookie";

export default function withUser(next) {
  return async function (...args) {
    let req = args[0];
    if (args[0] instanceof http.IncomingMessage) {
      // coming from a api route
    } else {
      // probably coming from a getServerSideProps function
      req = args[0].req;
    }

    let user;
    try {
      user = await CookieService.getUser(req);
    } catch (error) {
      let destination = "/auth/login";
      if (req.url) {
        destination += `?${qs.stringify({ next: req.url })}`;
      }
      return {
        redirect: {
          destination,
          permanent: false,
        },
      };
    }

    req.user = user;
    return await next(...args);
  };
}
