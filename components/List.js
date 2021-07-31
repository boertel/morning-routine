import { Time, PageTitle } from "ui";
import AddURL from "components/AddURL";
import Footer from "components/Footer";
import ListItem from "components/ListItem";
import RRule from "rrule";

const Strikethrough = (props) => {
  const hours = new Date().getHours();
  return (
    <>
      <span {...props} />
      <style jsx>{`
        span {
          position: relative;
        }
        span:before {
          content: "";
          display: ${hours >= 12 ? "block" : "none"};
          position: absolute;
          top: 50%;
          margin-top: 2px;
          left: -6px;
          right: -6px;
          height: 4px;
          background-color: red;
        }
      `}</style>
    </>
  );
};

export default function List({ data, canEdit = true }) {
  const sorted = Object.values(data).sort(({ rrule: first }, { rrule: second }) => {
    const a = RRule.fromString(first).isValid();
    const z = RRule.fromString(second).isValid();

    return a === z ? 0 : a ? -1 : 1;
  });
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
          {sorted.map((item, index) => {
            if (index === 0) {
              return (
                <div style={{ height: "calc(100vh - 160px)" }} className="flex flex-col justify-between" key={item.src}>
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
              return <ListItem key={item.id} {...item} canEdit={canEdit} />;
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
