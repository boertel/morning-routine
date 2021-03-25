import "../styles/globals.css";
import { SWRConfig } from "swr";

const options = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={options}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
