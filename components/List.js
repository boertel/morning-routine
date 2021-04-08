import { Strikethrough, Time, PageTitle } from "ui";
import AddURL from "components/AddURL";
import Footer from "components/Footer";
import ListItem from "components/ListItem";

export default function List({ data, canEdit = true }) {
  const today = new Date().getDay() - 1;
  return (
    <>
      <PageTitle>Good Morning!</PageTitle>
      <main className="max-w-prose mx-auto dark:bg-black px-4 min-h-screen flex flex-col">
        <div className="flex items-end justify-between mt-4 flex-wrap">
          <h1 className="font-extrabold text-6xl text-primary">
            <Strikethrough>Morning</Strikethrough> Routine
          </h1>
          <Time className="text-gray-500 font-light" />
        </div>
        <ul className="mt-8 space-y-12 flex-grow w-full">
          {Object.values(data)
            .sort(({ days: a }, { days: z }) => {
              if (Array.isArray(a) && Array.isArray(z)) {
                const firstA = a.map((v) => (v >= today ? v - today : v + (7 - today))).sort((a, z) => a - z)[0];
                const firstZ = z.map((v) => (v >= today ? v - today : v + (7 - today))).sort((a, z) => a - z)[0];
                return firstA - firstZ;
              } else {
                return -1;
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
                    <ListItem {...item} canEdit={canEdit} />
                    <h3 className="flex justify-center space-x-2">
                      <div>{canEdit ? "Scroll down to edit your list" : "Scroll down to view more items"}</div>
                      <div className="animate-bounce" style={{ animationIterationCount: 5 }}>
                        ↓
                      </div>
                    </h3>
                  </div>
                );
              } else {
                return <ListItem key={item.src} {...item} canEdit={canEdit} />;
              }
            })}
          {canEdit && (
            <div className="pt-16">
              <AddURL />
            </div>
          )}
        </ul>
        <Footer />
      </main>
    </>
  );
}