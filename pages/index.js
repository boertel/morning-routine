import { Time, PageTitle, VideoPlayer, Toggle } from "ui";
import cn from "classnames";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { rrulestr } from "rrule";
import AddURL from "components/AddURL";
import Footer from "components/Footer";
import { useItems } from "resources";
import { mutate } from "swr";

import { formatDuration } from "ui/formatters/duration";

const remove = (index) => () => {
  mutate("items", async (items) => {
    const data = items.splice(1, 1);
    localStorage.setItem("items", JSON.stringify(data));
    return data;
  });
};

const ItemInput = ({ as: AsComponent = "input", name, type = "text", defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue);
  const parts = name.split(".");

  const onChange = (evt) => {
    if (type === "checkbox") {
      if (evt.target.checked) {
        setValue([...defaultValue, evt.target.value]);
      } else {
        setValue(defaultValue.filter((v) => v != evt.target.value));
      }
    } else {
      setValue(evt.target.value);
    }
  };

  useEffect(() => {
    mutate("items", async (items) => {
      const data = items.map((item, index) => {
        if (index === parseInt(parts[0])) {
          return {
            ...item,
            [parts[1]]: value,
          };
        } else {
          return item;
        }
      });
      localStorage.setItem("items", JSON.stringify(data));
      return data;
    });
  }, [value]);

  let pass = {
    value,
  };

  if (type === "checkbox") {
    pass["checked"] = defaultValue.includes(props.value);
    pass["value"] = props.value;
  }

  return <AsComponent {...props} type={type} onChange={onChange} {...pass} />;
};

const NameInput = (props) => {
  return <ItemInput className="font-extrabold text-2xl bg-transparent" placeholder="Enter title" {...props} />;
};

const ToggleInput = (props) => {
  return <ItemInput type="checkbox" as={Toggle} {...props} />;
};

const ListItem = ({ index, name, src, duration, day, className }) => {
  return (
    <div className={cn("py-3", className)}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6 flex-wrap">
          <NameInput name={`${index}.name`} defaultValue={name} />
          <div className="text-yellow-200">{formatDuration(duration)}</div>
          <button onClick={remove(index)} className=" opacity-20 hover:opacity-100 transition-opacity">
            &times;
          </button>
        </div>
        <VideoPlayer src={src} />
        <fieldset className="mt-4 opacity-20 hover:opacity-100 transition-opacity">
          <legend className="mb-2">Show this video on:</legend>
          <div className="grid grid-cols-7 gap-x-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((weekday) => (
              <ToggleInput
                name={`${index}.day`}
                defaultValue={day}
                value={weekday.toUpperCase().slice(0, 2)}
                key={weekday}
              >
                {weekday}
              </ToggleInput>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default function Home() {
  const { data, mutate } = useItems();
  return (
    <>
      <PageTitle>Good Morning!</PageTitle>
      <main className="max-w-prose mx-auto dark:bg-black px-4 min-h-screen flex flex-col">
        <div className="flex items-end justify-between mt-4 flex-wrap">
          <h1 className="font-extrabold text-6xl text-primary">Morning Routine</h1>
          <Time className="text-gray-500 font-light" />
        </div>
        <ul className="mt-8 space-y-4 flex-grow">
          {data.map((item, index) => {
            const { day } = item;
            if (day && day.length) {
              console.log(`RRULE:FREQ=WEEKLY;BYDAY=${day.join(",")}`);
              const rrule = rrulestr(`RRULE:FREQ=WEEKLY;BYDAY=${day.join(",")}`);
              rrule.options.count = 1;
              //rrule.options.dtstart = dayjs().subtract(1, "day").toDate();
              const first = rrule.all()[0];
              if (dayjs().isSame(first, "day")) {
                return (
                  <div style={{ height: "calc(100vh - 160px)" }} className="flex flex-col justify-between">
                    <ListItem key={item.src} index={index} {...item} />
                    <h3 className="text-center">Scroll down to edit your list ↓</h3>
                  </div>
                );
              }
            }
            return <ListItem key={item.src} index={index} {...item} />;
          })}
          <div className="pt-16">
            <AddURL onSubmit={mutate} />
          </div>
        </ul>
        <Footer />
      </main>
    </>
  );
}
