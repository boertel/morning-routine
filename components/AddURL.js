import { Input } from "ui";
import qs from "qs";
import { useState } from "react";

import { addEntry } from "resources/entry";

export default function AddURL({ ...props }) {
  const [url, setUrl] = useState("");

  const onKeyDown = (evt) => {
    if (evt.key === "Enter") {
      let videoId = url;
      if (url.startsWith("http")) {
        videoId = qs.parse(new URL(url).search, { ignoreQueryPrefix: true })["v"];
      }
      setUrl("");
      addEntry(videoId);
    }
  };

  return (
    <Input
      type="text"
      placeholder="Add a YouTube Video URL"
      className="w-full my-3"
      value={url}
      onChange={(evt) => setUrl(evt.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
