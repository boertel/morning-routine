import { useState } from "react";
import cn from "classnames";
import YouTube from "react-youtube";
import { updateItem } from "resources";
import { PlayIcon } from "ui/icons";

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
      <div
        className={cn(
          "absolute object-cover w-full h-full transition-opacity bg-no-repeat bg-center bg-cover flex justify-center items-center",
          {
            "opacity-0": isReady,
            "opacity-100": !isReady,
          }
        )}
        style={{ transform: "scale(1.035)", backgroundImage: `url(${thumbnail.src})`, height: thumbnail.height }}
        onClick={() => setShowVideo(true)}
      >
        <div className="p-5 bg-gray-800 bg-opacity-60 rounded-lg">
          <PlayIcon />
        </div>
      </div>
      {showVideo && (
        <YouTube
          videoId={pk}
          onReady={onReady}
          opts={{ width: "100%", height: thumbnail.height, playerVars: { autoplay: 1 } }}
        />
      )}
    </div>
  );
}
