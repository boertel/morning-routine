import List from "components/List";
import Link from "next/link";
import { useEntries } from "resources/entry";
import { useUser } from "resources/user";
import { Header, PageTitle, Footer } from "ui";

export default function Home() {
  const { user } = useUser();
  const { data = [] } = useEntries(user && user.id);
  return (
    <>
      <PageTitle>Good Morning!</PageTitle>
      <Header />
      {!user ? <LoggedOutButtons /> : <List data={data} />}
      <Footer />
    </>
  );
}

function LoggedOutButtons() {
  return (
    <div className="text-center mt-20  flex-grow w-full">
      <Link href="/auth/login">
        <a>Login</a>
      </Link>
      <span className="text-gray-400">&nbsp;or&nbsp;</span>
      <Link href="/auth/signup">
        <a>Signup</a>
      </Link>
    </div>
  );
}
