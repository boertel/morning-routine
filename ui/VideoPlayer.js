import { useRef, useCallback, useEffect, useState } from "react";
import cn from "classnames";
import YouTube from "react-youtube";
import { PlayIcon } from "ui/icons";

export default function Video({ src, thumbnail, ...props }) {
  const ref = useRef();
  const [showVideo, setShowVideo] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoId = src.split("/").at(-1);

  function onReady({ target }) {
    ref.current = target;
    setIsReady(true);
  }

  function onEnd() {
    setIsReady(false);
    setShowVideo(false);
  }

  const pauseOnSpace = useCallback(
    (evt) => {
      if (ref.current) {
        if (evt.key === " ") {
          evt.preventDefault();
          const playerState = ref.current.getPlayerState();
          if (playerState !== 2) {
            ref.current.pauseVideo();
          } else {
            ref.current.playVideo();
          }
        }
      }
    },
    [ref]
  );

  useEffect(() => {
    window.addEventListener("keydown", pauseOnSpace);
    return () => window.removeEventListener("keydown", pauseOnSpace);
  }, []);

  return (
    <div className="w-full relative" style={{ maxHeight: thumbnail.height, aspectRatio: "16/9" }}>
      <div
        className={cn(
          "absolute w-full h-full transition-opacity bg-no-repeat bg-center bg-cover cursor-pointer flex justify-center items-center hover:opacity-100 transition-opacity",
          {
            "opacity-0": isReady,
            "pointer-events-none": isReady,
          }
        )}
        style={{ backgroundImage: `url(${thumbnail.src})` }}
        onClick={() => setShowVideo(true)}
      >
        <div className="p-5 bg-gray-800 bg-opacity-60 rounded-lg transform duration-200 hover:scale-125">
          <PlayIcon />
        </div>
      </div>
      {showVideo && (
        <YouTube
          videoId={videoId}
          onReady={onReady}
          onEnd={onEnd}
          opts={{ width: "100%", height: thumbnail.height, playerVars: { autoplay: 1 } }}
        />
      )}
    </div>
  );
}
