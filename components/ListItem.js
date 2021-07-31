import { useRef, useEffect } from "react";
import { VideoPlayer, Toggle } from "ui";
import cn from "classnames";
import { useFormik } from "formik";

import { useUser } from "resources/user";
import { updateEntry, deleteEntry } from "resources/entry";
import { formatDuration } from "ui/formatters/duration";
import RRule from "rrule";

export default function ListItem({ id, title, src, duration, rrule, className, thumbnail, canEdit, selected }) {
  const initialValues = {
    byday: RRule.fromString(rrule).BYDAY || [],
    title,
  };

  const { handleChange, values } = useFormik({
    initialValues,
  });

  const { user } = useUser();

  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      const { byday, ...valuesWithoutByDay } = values;
      const rrule = new RRule({ FREQ: "DAILY", BYDAY: byday });
      updateEntry(id, {
        ...valuesWithoutByDay,
        rrule: rrule.toString(),
      });
    }
  }, [initialValues, values]);

  const ref = useRef();
  useEffect(() => {
    if (selected) {
      ref.current.scrollIntoView();
    }
  }, [selected]);

  return (
    <div
      className={cn("py-3 px-3 border-transparent border-2 rounded-sm", className, { "border-primary": selected })}
      style={{ scrollMargin: "20px" }}
      ref={ref}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <TitleInput name="title" className="flex-grow" onChange={handleChange} value={values.title} />
          {canEdit && (
            <button
              className="p-2 opacity-20 hover:opacity-100 transition-opacity leading-none"
              onClick={() => deleteEntry(id, user.id)}
            >
              &times;
            </button>
          )}
        </div>
        <div className="text-yellow-200 mb-6">{formatDuration(duration)}</div>
        <VideoPlayer src={src} thumbnail={thumbnail} selected={selected} />
        <fieldset className="mt-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
          <legend className="mb-2">{canEdit ? "Show this video on:" : "This video will show on:"}</legend>
          <div className="grid grid-cols-7 gap-x-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((weekday, index) => {
              let parts = weekday.split("");
              const twoLetters = weekday.substr(0, 2).toUpperCase();
              return (
                <ToggleInput
                  name="byday"
                  onChange={(evt) =>
                    handleChange({
                      target: {
                        name: evt.target.name,
                        checked: evt.target.checked,
                        type: evt.target.type,
                        value: twoLetters,
                      },
                    })
                  }
                  value={index}
                  checked={values.byday.includes(twoLetters)}
                  key={weekday}
                  disabled={!canEdit}
                >
                  <div className="mb-2">{parts.splice(0, 3).join("")}</div>
                  <div className="mb-2">{parts.join("")}</div>
                </ToggleInput>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
}

const TitleInput = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "width-full font-extrabold text-2xl bg-transparent overflow-ellipsis overflow-hidden whitespace-nowrap rounded-md py-2 border-transparent focus:border-primary border-2",
        className
      )}
      placeholder="Enter title"
      {...props}
    />
  );
};

const ToggleInput = (props) => {
  return <Toggle type="checkbox" {...props} />;
};
