import { useRef, useCallback, useEffect, useState } from "react";
import cn from "classnames";
import YouTube from "react-youtube";
import { updateItem } from "resources";
import { PlayIcon } from "ui/icons";

export default function Video({ src, pk, thumbnail, ...props }) {
  const ref = useRef();
  const [showVideo, setShowVideo] = useState(false);
  const [isReady, setIsReady] = useState(false);

  function onReady({ target }) {
    ref.current = target;
    updateItem(pk, {
      duration: target.getDuration(),
    });
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
    <div className="w-full relative" style={{ height: thumbnail.height }}>
      <div
        className={cn(
          "absolute w-full h-full transition-opacity bg-no-repeat bg-center bg-cover cursor-pointer flex justify-center items-center hover:opacity-100 transition-opacity",
          {
            "opacity-0": isReady,
            "pointer-events-none": isReady,
          }
        )}
        style={{ backgroundImage: `url(${thumbnail.src})`, height: thumbnail.height }}
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
          onEnd={onEnd}
          opts={{ width: "100%", height: thumbnail.height, playerVars: { autoplay: 1 } }}
        />
      )}
    </div>
  );
}
