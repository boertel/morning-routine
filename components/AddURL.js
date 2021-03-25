import { Input } from "ui";
import qs from "qs";
import { useState } from "react";

import { addItem } from "resources";

export default function AddURL({ ...props }) {
  const [url, setUrl] = useState("");

  const onKeyDown = (evt) => {
    if (evt.key === "Enter") {
      const videoId = qs.parse(new URL(url).search, { ignoreQueryPrefix: true })["v"];
      setUrl("");
      addItem(videoId);
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
