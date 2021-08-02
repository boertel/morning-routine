import { useState, useEffect, useCallback } from "react";
import AddURL from "components/AddURL";
import ListItem from "components/ListItem";
import RRule from "rrule";
import { useOnKeyDown } from "ui/hooks";

export default function List({ data, canEdit = true }) {
  const sorted = Object.values(data).sort(({ rrule: first }, { rrule: second }) => {
    const a = RRule.fromString(first);
    const z = RRule.fromString(second);
    return a.getSortValue() - z.getSortValue();
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

  useOnKeyDown(keydown);

  return (
    <ul className="mt-8 space-y-12 flex-grow w-full">
      {sorted.map((item, index) => {
        if (index === 0) {
          return (
            <li style={{ height: "calc(100vh - 160px)" }} className="flex flex-col justify-between" key={item.src}>
              <ListItem key={item.id} {...item} canEdit={canEdit} selected={selected === index} />
              <h3 className="flex justify-center space-x-2">
                <div>{canEdit ? "Scroll down to edit your list" : "Scroll down to view more items"}</div>
                <div className="animate-bounce" style={{ animationIterationCount: 5 }}>
                  ↓
                </div>
              </h3>
            </li>
          );
        } else {
          return <ListItem as="li" key={item.id} {...item} canEdit={canEdit} selected={selected === index} />;
        }
      })}
      {canEdit && (
        <div className="pt-16 px-3">
          <AddURL />
        </div>
      )}
    </ul>
  );
}
