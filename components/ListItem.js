import { VideoPlayer, Toggle } from "ui";
import { useEffect } from "react";
import cn from "classnames";
import { useFormik } from "formik";

import { formatDuration } from "ui/formatters/duration";
import { updateItem, deleteItem } from "resources";

const NameInput = (props) => {
  return <input className="font-extrabold text-2xl bg-transparent" placeholder="Enter title" {...props} />;
};

const ToggleInput = (props) => {
  return <Toggle type="checkbox" {...props} />;
};

export default function ListItem({ pk, name, src, duration, day, className }) {
  const { handleChange, values } = useFormik({
    initialValues: {
      day,
      name,
    },
  });

  useEffect(() => {
    updateItem(pk, values);
  }, [values]);

  return (
    <div className={cn("py-3", className)}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6 flex-wrap">
          <NameInput name="name" onChange={handleChange} value={values.name} />
          <div className="text-yellow-200">{formatDuration(duration)}</div>
          <button
            onClick={() => deleteItem(pk)}
            className="p-2 opacity-20 hover:opacity-100 transition-opacity leading-none"
          >
            &times;
          </button>
        </div>
        <VideoPlayer src={src} />
        <fieldset className="mt-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
          <legend className="mb-2">Show this video on:</legend>
          <div className="grid grid-cols-7 gap-x-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((weekday, index) => (
              <ToggleInput
                name="day"
                onChange={handleChange}
                value={`${index}`}
                checked={values.day.includes(`${index}`)}
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
}
