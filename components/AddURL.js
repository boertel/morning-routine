import { useCallback, useRef } from "react";
import { Input } from "ui";
import qs from "qs";
import { useState } from "react";

import { addEntry } from "resources/entry";
import { useUser } from "resources/user";
import { useOnKeyDown } from "ui/hooks";

export default function AddURL({ ...props }) {
  const [url, setUrl] = useState("");
  const { user } = useUser();

  const ref = useRef();
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
      let videoId = url;
      if (url.startsWith("http")) {
        videoId = qs.parse(new URL(url).search, { ignoreQueryPrefix: true })["v"];
      }
      setUrl("");
      addEntry(videoId, user.id);
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
