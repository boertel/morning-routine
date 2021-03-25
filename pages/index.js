import { Time, PageTitle } from "ui";
import AddURL from "components/AddURL";
import Footer from "components/Footer";
import ListItem from "components/ListItem";
import { useItems } from "resources";

export default function Home() {
  const { data } = useItems();
  const today = `${new Date().getDay() - 1}`;
  return (
    <>
      <PageTitle>Good Morning!</PageTitle>
      <main className="max-w-prose mx-auto dark:bg-black px-4 min-h-screen flex flex-col">
        <div className="flex items-end justify-between mt-4 flex-wrap">
          <h1 className="font-extrabold text-6xl text-primary">Morning Routine</h1>
          <Time className="text-gray-500 font-light" />
        </div>
        <ul className="mt-8 space-y-4 flex-grow">
          {Object.values(data)
            .sort(({ day: a }, { day: z }) => {
              if (a.includes(today) && z.includes(today)) {
                return 1;
              } else if (a.includes(today) || z.includes(today)) {
                return -1;
              } else if (Array.isArray(a) && Array.isArray(z)) {
                return a[0] - z[0];
              }
            })
            .map((item, index) => {
              if (index === 0) {
                return (
                  <div
                    style={{ height: "calc(100vh - 160px)" }}
                    className="flex flex-col justify-between"
                    key={item.src}
                  >
                    <ListItem {...item} />
                    <h3 className="flex justify-center space-x-2">
                      <div>Scroll down to edit your list</div>
                      <div className="animate-bounce" style={{ animationIterationCount: 5 }}>
                        ↓
                      </div>
                    </h3>
                  </div>
                );
              } else {
                return <ListItem key={item.src} {...item} />;
              }
            })}
          <div className="pt-16">
            <AddURL />
          </div>
        </ul>
        <Footer />
      </main>
    </>
  );
}
