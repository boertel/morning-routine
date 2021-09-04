import "../styles/globals.css";
import { SWRConfig } from "swr";
import { UserContextProvider } from "resources/user";

const options = {
  revalidateOnFocus: true,
  shouldRetryOnError: false,
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={options}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </SWRConfig>
  );
}

export default MyApp;
