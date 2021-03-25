import { useState } from "react";
import YouTube from "react-youtube";
import { updateItem } from "resources";

export default function Video({ src, pk, thumbnail, ...props }) {
  const [showVideo, setShowVideo] = useState(false);

  function onReady({ target }) {
    updateItem(pk, {
      duration: target.getDuration(),
    });
  }

  return (
    <div style={{ width: "100%" }}>
      {!showVideo && (
        <img
          src={thumbnail.src}
          height={thumbnail.height}
          className="object-contain w-full"
          onClick={() => setShowVideo(true)}
        />
      )}
      {showVideo && <YouTube videoId={pk} onReady={onReady} />}
    </div>
  );
}
