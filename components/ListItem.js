import { VideoPlayer, Toggle } from "ui";
import cn from "classnames";
import { useEffect } from "react";
import { useFormik } from "formik";

import { formatDuration } from "ui/formatters/duration";
import { updateItem, deleteItem } from "resources";

const TitleInput = ({ className, ...props }) => {
  return (
    <input className={cn("font-extrabold text-2xl bg-transparent", className)} placeholder="Enter title" {...props} />
  );
};

const ToggleInput = (props) => {
  return <Toggle type="checkbox" {...props} />;
};

export default function ListItem({ pk, title, src, duration, day, className, thumbnail }) {
  const initialValues = {
    day,
    title,
  };
  const { handleChange, values } = useFormik({
    initialValues,
  });

  useEffect(() => {
    if (JSON.stringify(initialValues) !== JSON.stringify(values)) {
      values.day = values.day.map((d) => parseInt(d, 10)).sort((a, z) => a - z);
      updateItem(pk, values);
    }
  }, [values, updateItem, initialValues, pk]);

  return (
    <div className={cn("py-3", className)}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between flex-wrap">
          <TitleInput name="title" className="flex-grow" onChange={handleChange} value={values.title} />
          <button
            onClick={() => deleteItem(pk)}
            className="p-2 opacity-20 hover:opacity-100 transition-opacity leading-none"
          >
            &times;
          </button>
        </div>
        <div className="text-yellow-200 mb-6">{formatDuration(duration)}</div>
        <VideoPlayer src={src} thumbnail={thumbnail} pk={pk} />
        <fieldset className="mt-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
          <legend className="mb-2">Show this video on:</legend>
          <div className="grid grid-cols-7 gap-x-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((weekday, index) => (
              <ToggleInput
                name="day"
                onChange={handleChange}
                value={index}
                checked={values.day.includes(index)}
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
