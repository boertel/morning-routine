import { useState } from "react";
import cn from "classnames";
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
      <img
        src={thumbnail.src}
        height={thumbnail.height}
        className={cn("absolute object-cover w-full h-full transition-opacity", {
          "opacity-0": isReady,
          "opacity-100": !isReady,
        })}
        style={{ transform: "scale(1.035)" }}
        onClick={() => setShowVideo(true)}
      />
      {showVideo && <YouTube videoId={pk} onReady={onReady} opts={{ width: "100%", height: thumbnail.height }} />}
    </div>
  );
}
