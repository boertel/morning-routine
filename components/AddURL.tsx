import { useCallback, useRef } from "react";
import { Input } from "ui";
import qs from "qs";
import { useState } from "react";

import { addEntry } from "resources/entry";
import { useUser } from "resources/user";
import { useOnKeyDown } from "ui/hooks";

export default function AddURL({ ...props }) {
  const [url, setUrl] = useState<string>("");
  const { user } = useUser();

  const ref = useRef<HTMLInputElement>();
  useOnKeyDown(
    useCallback(
      (evt) => {
        if (evt.key === "n") {
          evt.preventDefault();
          ref.current.scrollIntoView();
          ref.current.focus();
        }
      },
      [ref]
    )
  );

  const onKeyDown = (evt) => {
    if (evt.key === "Enter") {
      addEntry(url, user.id);
      setUrl("");
    }
  };

  return (
    <Input
      type="text"
      ref={ref}
      placeholder="Add a YouTube Video URL"
      className="w-full my-3"
      value={url}
      onChange={(evt) => setUrl(evt.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
