import List from "components/List";
import Link from "next/link";
import { useEntries } from "resources/entry";
import { useUser } from "resources/user";
import { Header, PageTitle, Footer, Loading } from "ui";

export default function Home() {
  const { user, isValidating: isValidatingUser } = useUser();
  const { data = [], isValidating } = useEntries(user && user.id);
  return (
    <>
      <PageTitle>Good Morning!</PageTitle>
      <Header />
      {(isValidatingUser || isValidating) && data.length === 0 ? (
        <div className="w-full flex justify-center px-3 py-10 flex-1">
          <Loading />
        </div>
      ) : !user ? (
        <LoggedOutButtons />
      ) : (
        <List data={data} />
      )}
      <Footer />
    </>
  );
}

function LoggedOutButtons() {
  return (
    <div className="text-center mt-20 flex-grow w-full space-y-8">
      <h3 className="text-3xl font-bold">Access your exercise videos in seconds without distractions!</h3>
      <div>
        <Link href="/auth/signup">
          <a className="rounded py-2 px-4 text-primary border-primary border hover:bg-primary hover:bg-opacity-40 hover:no-underline">
            Signup
          </a>
        </Link>
      </div>
      <div className="text-gray-400 flex flex-wrap justify-center">
        <div>Curious of what you are getting once signed up?&nbsp;</div>
        <Link href="/ben">
          <a className="italic">Click here to see my feed</a>
        </Link>
      </div>
    </div>
  );
}
