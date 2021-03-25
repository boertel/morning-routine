import { useState } from "react";
import YouTube from "react-youtube";
import { updateItem } from "resources";

export default function Video({ src, pk, thumbnail, ...props }) {
  const [showVideo, setShowVideo] = useState(false);
  const [isReady, setIsReady] = useState(false);

  function onReady({ target }) {
    updateItem(pk, {
      duration: target.getDuration(),
    });
    setIsReady(true);
  }

  return (
    <div className="w-full relative" style={{ height: thumbnail.height }}>
      {!isReady && (
        <img
          src={thumbnail.src}
          height={thumbnail.height}
          className="absolute object-cover w-full h-full"
          onClick={() => setShowVideo(true)}
        />
      )}
      {showVideo && <YouTube videoId={pk} onReady={onReady} opts={{ width: "100%", height: thumbnail.height }} />}
    </div>
  );
}
