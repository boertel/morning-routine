import { VideoPlayer, Toggle } from "ui";
import cn from "classnames";
import { useCallback, useEffect } from "react";
import { useFormik } from "formik";

import { formatDuration } from "ui/formatters/duration";
import { updateItem, deleteItem } from "resources";

export default function ListItem({ id, title, src, duration, days, className, thumbnail, canEdit }) {
  const initialValues = {
    days,
    title,
  };
  const { handleChange, values } = useFormik({
    initialValues,
  });

  useEffect(() => {
    if (canEdit) {
      if (JSON.stringify(initialValues) !== JSON.stringify(values)) {
        values.days = values.days.sort((a, z) => a - z);
        updateItem(id, values);
      }
    }
  }, [canEdit, updateItem, JSON.stringify(initialValues), JSON.stringify(values), id]);

  const onReady = useCallback(
    ({ target }) => {
      updateItem(id, {
        duration: target.getDuration(),
      });
    },
    [id, updateItem]
  );

  return (
    <div className={cn("py-3", className)}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between flex-wrap">
          <TitleInput name="title" className="flex-grow" onChange={handleChange} value={values.title} />
          {canEdit && (
            <button
              onClick={() => deleteItem(id)}
              className="p-2 opacity-20 hover:opacity-100 transition-opacity leading-none"
            >
              &times;
            </button>
          )}
        </div>
        <div className="text-yellow-200 mb-6">{formatDuration(duration)}</div>
        <VideoPlayer src={src} thumbnail={thumbnail} onReady={onReady} />
        <fieldset className="mt-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
          <legend className="mb-2">{canEdit ? "Show this video on:" : "This video will show on:"}</legend>
          <div className="grid grid-cols-7 gap-x-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((weekday, index) => (
              <ToggleInput
                name="days"
                onChange={(evt) => {
                  handleChange({
                    target: {
                      name: evt.target.name,
                      checked: evt.target.checked,
                      type: evt.target.type,
                      value: evt.target.value,
                    },
                  });
                }}
                value={index}
                checked={values.days.includes(`${index}`)}
                key={weekday}
                disabled={!canEdit}
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

const TitleInput = ({ className, ...props }) => {
  return (
    <input
      className={cn("font-extrabold text-2xl bg-transparent truncate", className)}
      placeholder="Enter title"
      {...props}
    />
  );
};

const ToggleInput = (props) => {
  return <Toggle type="checkbox" {...props} />;
};
