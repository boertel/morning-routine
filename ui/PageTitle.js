import Head from "next/head";

export default function PageTitle({ children }) {
  let parts = [];
  if (children) {
    parts.push(children);
  }
  parts.push("Morning Routine");
  return (
    <Head>
      <title>{parts.join(" – ")}</title>
    </Head>
  );
}
