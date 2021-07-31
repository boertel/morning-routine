import { useState, useEffect, useCallback } from "react";
import { Time, PageTitle } from "ui";
import AddURL from "components/AddURL";
import Footer from "components/Footer";
import ListItem from "components/ListItem";
import RRule, { WEEKDAY } from "rrule";

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
    const a = RRule.fromString(first);
    const z = RRule.fromString(second);

    const dayA = a.BYDAY.at(0);
    const dayZ = z.BYDAY.at(0);
    const diff = dayA === dayZ ? 0 : isNaN(dayA) ? 1 : isNaN(dayZ) ? -1 : WEEKDAY[dayA] - WEEKDAY[dayZ];

    return a.isValid() === z.isValid() ? diff : a.isValid() ? -1 : 1;
  });

  const [selected, setSelected] = useState(null);

  const keydown = useCallback(
    (evt) => {
      if (evt.key === "j") {
        setSelected((previous) => (previous === null || previous === sorted.length - 1 ? 0 : previous + 1));
      } else if (evt.key === "k") {
        setSelected((previous) => (previous === null || previous === 0 ? sorted.length - 1 : previous - 1));
      }
    },
    [sorted, setSelected]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  return (
    <>
      <PageTitle>Good Morning!</PageTitle>
      <main className="max-w-prose mx-auto dark:bg-black px-4 min-h-screen flex flex-col">
        <div className="flex items-end justify-between mt-4 flex-wrap">
          <h1 className="font-extrabold text-6xl text-primary" style={{ fontSize: "clamp(2em, 6vw, 4em)" }}>
            <Strikethrough>Morning</Strikethrough> Routine
          </h1>
          <Time className="text-gray-500 font-light" />
        </div>
        <ul className="mt-8 space-y-12 flex-grow w-full">
          {sorted.map((item, index) => {
            if (index === 0) {
              return (
                <div style={{ height: "calc(100vh - 160px)" }} className="flex flex-col justify-between" key={item.src}>
                  <ListItem key={item.id} {...item} canEdit={canEdit} selected={selected === index} />
                  <h3 className="flex justify-center space-x-2">
                    <div>{canEdit ? "Scroll down to edit your list" : "Scroll down to view more items"}</div>
                    <div className="animate-bounce" style={{ animationIterationCount: 5 }}>
                      ↓
                    </div>
                  </h3>
                </div>
              );
            } else {
              return <ListItem key={item.id} {...item} canEdit={canEdit} selected={selected === index} />;
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
